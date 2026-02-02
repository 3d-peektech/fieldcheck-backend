-- FieldCheck Database Schema
-- Run this in your Render PostgreSQL database

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    industry VARCHAR(100),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    location VARCHAR(255),
    serial_number VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inspections table
CREATE TABLE IF NOT EXISTS inspections (
    id SERIAL PRIMARY KEY,
    asset_id INTEGER REFERENCES assets(id) ON DELETE CASCADE,
    inspector_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    scheduled_date TIMESTAMP,
    completed_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_assets_company_id ON assets(company_id);
CREATE INDEX IF NOT EXISTS idx_inspections_asset_id ON inspections(asset_id);
CREATE INDEX IF NOT EXISTS idx_inspections_inspector_id ON inspections(inspector_id);
CREATE INDEX IF NOT EXISTS idx_inspections_status ON inspections(status);

-- Insert sample data (optional)
INSERT INTO users (email, password, first_name, last_name, role) 
VALUES ('admin@fieldcheck.com', '$2a$10$YourHashedPasswordHere', 'Admin', 'User', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO companies (name, address, industry, contact_email, contact_phone) 
VALUES 
    ('Sample Company', '123 Main St, City, State', 'Technology', 'contact@sample.com', '555-0100'),
    ('Test Industries', '456 Oak Ave, Town, State', 'Manufacturing', 'info@test.com', '555-0200')
ON CONFLICT DO NOTHING;

-- Add comments for documentation
COMMENT ON TABLE users IS 'User accounts for authentication and authorization';
COMMENT ON TABLE companies IS 'Companies that own assets';
COMMENT ON TABLE assets IS 'Physical assets that require inspection';
COMMENT ON TABLE inspections IS 'Inspection records for assets';
