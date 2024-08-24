# run.ps1

$iterations = 5
$nodeResults = @()
$swcResults = @()

# const relativePath = .\node_eslint.mjs

Write-Host "Running Node.js version $iterations times..."
for ($i = 1; $i -le $iterations; $i++) {
    $output = node .\scripts\debug_eslint\node_eslint.mjs
    $time = $output | Select-String -Pattern "Vanilla Node.js Execution: (\d+\.\d+)ms" | ForEach-Object { $_.Matches.Groups[1].Value }
    $nodeResults += [double]$time
    Write-Host ("Iteration {0}: {1} ms" -f $i, $time)
}

Write-Host "`nRunning SWC version $iterations times..."
for ($i = 1; $i -le $iterations; $i++) {
    $output = node .\scripts\debug_eslint\swc_eslint.mjs
    $time = $output | Select-String -Pattern "SWC Parsing and Execution: (\d+\.\d+)ms" | ForEach-Object { $_.Matches.Groups[1].Value }
    $swcResults += [double]$time
    Write-Host ("Iteration {0}: {1} ms" -f $i, $time)
}

$nodeAvg = ($nodeResults | Measure-Object -Average).Average
$swcAvg = ($swcResults | Measure-Object -Average).Average

Write-Host "`nResults:"
Write-Host ("Node.js average execution time: {0:F2} ms" -f $nodeAvg)
Write-Host ("SWC average execution time: {0:F2} ms" -f $swcAvg)

$difference = $nodeAvg - $swcAvg
$percentageDifference = ($difference / $nodeAvg) * 100

if ($difference -gt 0) {
    Write-Host ("SWC is faster by {0:F2} ms ({1:F2}%)" -f $difference, $percentageDifference)
} elseif ($difference -lt 0) {
    Write-Host ("Node.js is faster by {0:F2} ms ({1:F2}%)" -f (-$difference), (-$percentageDifference))
} else {
    Write-Host "Both methods have the same average execution time."
}
