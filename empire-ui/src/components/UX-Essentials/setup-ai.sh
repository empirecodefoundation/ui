#!/bin/bash

# UserTracker AI Analytics Setup Script
# Run this script to quickly set up AI Analytics

echo "🤖 UserTracker AI Analytics Setup"
echo "================================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ Found existing .env.local file"
else
    echo "📝 Creating .env.local file..."
    
    # Prompt for OpenAI API key
    read -p "Enter your OpenAI API Key (starts with sk-proj-...): " apiKey
    
    if [[ $apiKey == sk-* ]]; then
        echo "OPENAI_API_KEY=$apiKey" > .env.local
        echo "✅ Created .env.local with your API key"
    else
        echo "❌ Invalid API key format. Please try again."
        echo "Get your API key from: https://platform.openai.com/api-keys"
        exit 1
    fi
fi

echo ""
echo "🚀 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Start the dev server: npm run dev"
echo "2. Open: http://localhost:3000"
echo "3. Click some buttons to generate data"
echo "4. Visit: http://localhost:3000/ai-analytics"
echo ""
echo "🎉 Enjoy your AI-powered user analytics!"