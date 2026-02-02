const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  
  async analyzeInspectionImage(imageBuffer, assetType, assetName) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const prompt = `You are an expert industrial maintenance engineer analyzing equipment inspection photos.

Asset Information:
- Type: ${assetType}
- Name: ${assetName}

Please analyze this image and provide a detailed assessment in the following JSON format:

{
  "overallCondition": "excellent|good|fair|poor|critical",
  "conditionScore": 0-100,
  "detectedIssues": [
    {
      "type": "corrosion|wear|leak|crack|misalignment|contamination|other",
      "severity": "minor|moderate|major|critical",
      "description": "detailed description",
      "location": "specific location on equipment",
      "confidence": 0-100
    }
  ],
  "recommendations": [
    "specific action item 1",
    "specific action item 2"
  ],
  "urgency": "low|medium|high|critical",
  "estimatedMaintenanceCost": estimated cost in EUR,
  "predictedFailureRisk": {
    "level": "low|medium|high|critical",
    "timeframe": "days|weeks|months",
    "confidence": 0-100
  },
  "safetyRisks": [
    "any safety concerns identified"
  ],
  "complianceIssues": [
    "any regulatory or compliance issues"
  ]
}

Be specific and technical. Focus on actionable insights.`;

      const imagePart = {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: "image/jpeg"
        }
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse AI response');
      }

      const analysis = JSON.parse(jsonMatch[0]);

      return {
        success: true,
        analysis,
        model: "gemini-1.5-pro",
        analyzedAt: new Date(),
        rawResponse: text
      };

    } catch (error) {
      console.error('AI Analysis Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async generateInspectionReport(inspection, asset, analysis) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const prompt = `Generate a professional inspection report based on this data:

Asset: ${asset.name} (${asset.type})
Location: ${asset.location?.building || 'Unknown'}
Inspector: ${inspection.inspector.name}
Date: ${inspection.createdAt.toLocaleDateString()}

AI Analysis Results:
${JSON.stringify(analysis, null, 2)}

Inspector Notes:
${inspection.notes || 'No additional notes'}

Generate a comprehensive inspection report in markdown format with:
1. Executive Summary
2. Condition Assessment
3. Issues Found (with severity ratings)
4. Recommendations (prioritized)
5. Cost Estimates
6. Next Steps

Make it professional and actionable.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const report = response.text();

      return {
        success: true,
        report,
        generatedAt: new Date()
      };

    } catch (error) {
      console.error('Report Generation Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async predictMaintenanceNeeds(assetHistory) {
    try {
      const model = genAI.getGenerativeAI({ model: "gemini-1.5-pro" });

      const prompt = `Based on this asset inspection history, predict future maintenance needs:

${JSON.stringify(assetHistory, null, 2)}

Provide predictions in JSON format:
{
  "predictedIssues": [
    {
      "issue": "description",
      "probability": 0-100,
      "expectedTimeframe": "1-3 months|3-6 months|6-12 months",
      "severity": "minor|moderate|major|critical",
      "recommendedAction": "specific action"
    }
  ],
  "overallTrend": "improving|stable|declining",
  "recommendedMaintenanceSchedule": "description",
  "costForecast": {
    "next3Months": amount,
    "next6Months": amount,
    "next12Months": amount
  }
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse prediction response');
      }

      const prediction = JSON.parse(jsonMatch[0]);

      return {
        success: true,
        prediction,
        generatedAt: new Date()
      };

    } catch (error) {
      console.error('Prediction Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new AIService();
