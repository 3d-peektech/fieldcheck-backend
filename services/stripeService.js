const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Company = require('../models/Company');

// Plan limits
const PLAN_LIMITS = {
  trial: {
    maxUsers: 5,
    maxAssets: 50,
    maxInspectionsPerMonth: 100,
    aiAnalysisEnabled: true
  },
  basic: {
    maxUsers: 10,
    maxAssets: 200,
    maxInspectionsPerMonth: 500,
    aiAnalysisEnabled: true
  },
  professional: {
    maxUsers: 50,
    maxAssets: 1000,
    maxInspectionsPerMonth: 5000,
    aiAnalysisEnabled: true
  },
  enterprise: {
    maxUsers: 999,
    maxAssets: 999999,
    maxInspectionsPerMonth: 999999,
    aiAnalysisEnabled: true
  }
};

class StripeService {
  
  async createCustomer(company, email) {
    try {
      const customer = await stripe.customers.create({
        email,
        name: company.name,
        metadata: {
          companyId: company._id.toString()
        }
      });

      company.subscription.stripeCustomerId = customer.id;
      await company.save();

      return customer;
    } catch (error) {
      console.error('Create customer error:', error);
      throw error;
    }
  }

  async createSubscription(company, priceId) {
    try {
      let customerId = company.subscription.stripeCustomerId;

      // Create customer if doesn't exist
      if (!customerId) {
        const customer = await this.createCustomer(company, company.email);
        customerId = customer.id;
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          companyId: company._id.toString()
        }
      });

      // Update company
      company.subscription.stripeSubscriptionId = subscription.id;
      company.subscription.status = subscription.status;
      company.subscription.currentPeriodEnd = new Date(subscription.current_period_end * 1000);

      // Set plan based on priceId
      if (priceId === process.env.BASIC_PLAN_PRICE_ID) {
        company.subscription.plan = 'basic';
        company.limits = PLAN_LIMITS.basic;
      } else if (priceId === process.env.PRO_PLAN_PRICE_ID) {
        company.subscription.plan = 'professional';
        company.limits = PLAN_LIMITS.professional;
      } else if (priceId === process.env.ENTERPRISE_PLAN_PRICE_ID) {
        company.subscription.plan = 'enterprise';
        company.limits = PLAN_LIMITS.enterprise;
      }

      await company.save();

      return {
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret
      };
    } catch (error) {
      console.error('Create subscription error:', error);
      throw error;
    }
  }

  async cancelSubscription(company) {
    try {
      const subscriptionId = company.subscription.stripeSubscriptionId;

      if (!subscriptionId) {
        throw new Error('No active subscription');
      }

      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true
      });

      company.subscription.status = 'cancelled';
      await company.save();

      return subscription;
    } catch (error) {
      console.error('Cancel subscription error:', error);
      throw error;
    }
  }

  async updateSubscription(company, newPriceId) {
    try {
      const subscriptionId = company.subscription.stripeSubscriptionId;

      if (!subscriptionId) {
        throw new Error('No active subscription');
      }

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
        items: [{
          id: subscription.items.data[0].id,
          price: newPriceId
        }],
        proration_behavior: 'create_prorations'
      });

      // Update plan
      if (newPriceId === process.env.BASIC_PLAN_PRICE_ID) {
        company.subscription.plan = 'basic';
        company.limits = PLAN_LIMITS.basic;
      } else if (newPriceId === process.env.PRO_PLAN_PRICE_ID) {
        company.subscription.plan = 'professional';
        company.limits = PLAN_LIMITS.professional;
      } else if (newPriceId === process.env.ENTERPRISE_PLAN_PRICE_ID) {
        company.subscription.plan = 'enterprise';
        company.limits = PLAN_LIMITS.enterprise;
      }

      await company.save();

      return updatedSubscription;
    } catch (error) {
      console.error('Update subscription error:', error);
      throw error;
    }
  }

  async handleWebhook(event) {
    try {
      switch (event.type) {
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object);
          break;
        
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object);
          break;
        
        case 'invoice.payment_succeeded':
          await this.handlePaymentSucceeded(event.data.object);
          break;
        
        case 'invoice.payment_failed':
          await this.handlePaymentFailed(event.data.object);
          break;
      }
    } catch (error) {
      console.error('Webhook handling error:', error);
      throw error;
    }
  }

  async handleSubscriptionUpdated(subscription) {
    const company = await Company.findOne({
      'subscription.stripeSubscriptionId': subscription.id
    });

    if (company) {
      company.subscription.status = subscription.status;
      company.subscription.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
      await company.save();
    }
  }

  async handleSubscriptionDeleted(subscription) {
    const company = await Company.findOne({
      'subscription.stripeSubscriptionId': subscription.id
    });

    if (company) {
      company.subscription.status = 'cancelled';
      company.subscription.plan = 'trial';
      company.limits = PLAN_LIMITS.trial;
      await company.save();
    }
  }

  async handlePaymentSucceeded(invoice) {
    const company = await Company.findOne({
      'subscription.stripeCustomerId': invoice.customer
    });

    if (company) {
      company.subscription.status = 'active';
      await company.save();
    }
  }

  async handlePaymentFailed(invoice) {
    const company = await Company.findOne({
      'subscription.stripeCustomerId': invoice.customer
    });

    if (company) {
      company.subscription.status = 'past_due';
      await company.save();
    }
  }
}

module.exports = new StripeService();
