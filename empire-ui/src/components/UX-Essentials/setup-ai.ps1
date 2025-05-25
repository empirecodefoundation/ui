# UserTracker AI Analytics Setup Script
# Run this script to quickly set up AI Analytics

Write-Host "🤖 UserTracker AI Analytics Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (Test-Path ".env.local") {
    Write-Host "✅ Found existing .env.local file" -ForegroundColor Green
} else {
    Write-Host "📝 Creating .env.local file..." -ForegroundColor Yellow
    
    # Prompt for OpenAI API key
    $apiKey = Read-Host "Enter your OpenAI API Key (starts with sk-proj-...)"
    
    if ($apiKey -and $apiKey.StartsWith("sk-")) {
        "OPENAI_API_KEY=$apiKey" | Out-File -FilePath ".env.local" -Encoding UTF8
        Write-Host "✅ Created .env.local with your API key" -ForegroundColor Green
    } else {
        Write-Host "❌ Invalid API key format. Please try again." -ForegroundColor Red
        Write-Host "Get your API key from: https://platform.openai.com/api-keys" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host ""
Write-Host "🚀 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start the dev server: npm run dev" -ForegroundColor White
Write-Host "2. Open: http://localhost:3000" -ForegroundColor White
Write-Host "3. Click some buttons to generate data" -ForegroundColor White
Write-Host "4. Visit: http://localhost:3000/ai-analytics" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Enjoy your AI-powered user analytics!" -ForegroundColor Green