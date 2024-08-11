# Documentation file

## Debugging
Debug configurations:
1. 'AI_ClientApp' - Primary debug configuration. Should work out of the box.
2. 'CustomCommand' - If you need to define custom inputs to run the application.

## Why this debug approach?
To run SPAs you have to:
1. Start the development server (Vite)
2. Load the application in the browser (Chrome)
3. Attach the debugger to Vite server*

*Attaching debugger for HMR server which reloads code is tricky, consider using in-code 'debugger' with native browser debugger to avoid tricky situations.

