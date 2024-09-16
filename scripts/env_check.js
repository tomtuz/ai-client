const { execSync } = require('child_process')
const os = require('os')

function isChromaInstalled() {
  try {
    if (os.platform() === 'win32') {
      // For Windows
      execSync('where chroma', { stdio: 'ignore' })
    } else {
      // For Linux and macOS
      execSync('which chroma', { stdio: 'ignore' })
    }
    return true
  } catch (error) {
    return false
  }
}

if (!isChromaInstalled()) {
  console.error("Chroma is not installed. Please install it using 'pip install chromadb'")
  process.exit(1)
}

console.log('Chroma is installed and ready to use.')
