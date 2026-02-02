#!/bin/bash
# Database Setup Script for FieldCheck

echo "🔧 Setting up FieldCheck Database..."

# Database connection string
DB_URL="postgresql://fieldcheck_user:KOFNdsYXCxzdXcSUVrvtBiWAZgQxYTDB@dpg-d60dup0gjchc73ef7kk0-a.oregon-postgres.render.com/fieldcheck"

# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo "❌ psql is not installed. Please install PostgreSQL client."
    echo ""
    echo "Install options:"
    echo "  Mac: brew install postgresql"
    echo "  Ubuntu: sudo apt-get install postgresql-client"
    echo "  Windows: Download from https://www.postgresql.org/download/windows/"
    exit 1
fi

echo "✅ PostgreSQL client found"
echo "📊 Creating database tables..."
echo ""

# Run the schema
psql "$DB_URL" -f database/schema.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database setup completed successfully!"
    echo "🎉 Your tables are ready:"
    echo "   - users"
    echo "   - companies"
    echo "   - assets"
    echo "   - inspections"
else
    echo ""
    echo "❌ Database setup failed. Please check the error above."
fi
