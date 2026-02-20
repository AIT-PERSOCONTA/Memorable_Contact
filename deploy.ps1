# Build the project locally to ensure no errors
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Deployment aborted." -ForegroundColor Red
    exit $LASTEXITCODE
}

# Deploy to Vercel
Write-Host "Starting Vercel deployment..." -ForegroundColor Cyan
vercel --prod
