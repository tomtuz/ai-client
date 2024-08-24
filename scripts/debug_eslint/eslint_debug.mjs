// Node
import fs from "node:fs";
import path from "node:path";

// ESLint Plugins
import ReactModernPlugin from "@eslint-react/eslint-plugin";
import JSPlugin from "@eslint/js";
import PrettierPlugin from "eslint-config-prettier";
import ReactBasePlugin from "eslint-plugin-react";
import ReactHooksPlugin from "eslint-plugin-react-hooks";
import ReactRefreshPlugin from "eslint-plugin-react-refresh";
import TSPlugin from "typescript-eslint";

/*
 * Legend:
 * 1. Constants and Configurations
 * 2. Utility Functions
 *   - createCircularReplacer
 *   - writeJSONToFile
 */

// 1. Constants and Configurations
const LOG_DIR = "logs/diff/";
const PLUGIN_MODULES = [
  { module: JSPlugin, name: "JavaScript" },
  { module: TSPlugin, name: "TypeScript" },
  { module: ReactBasePlugin, name: "React" },
  { module: ReactModernPlugin, name: "ReactModern" },
  { module: ReactHooksPlugin, name: "ReactHooks" },
  { module: ReactRefreshPlugin, name: "ReactRefresh" },
  { module: PrettierPlugin, name: "Prettier" },
];

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// 2. Utility Functions
function createCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  };
}

function writeJSONToFile(filePath, jsonData) {
  try {
    const data = JSON.stringify(jsonData, createCircularReplacer(), 2);
    fs.writeFileSync(filePath, data);
    console.log(`Data saved to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
}

function SavePluginConfigs() {
  // 1. Save files
  for (const { module, name } of PLUGIN_MODULES) {
    if (typeof module !== "object" || module === null) {
      console.warn(`Skipping invalid module: ${name}`);
      continue;
    }

    const fileName = `${name}.json`;
    const filePath = path.join(LOG_DIR, fileName);

    writeJSONToFile(filePath, module);
  }
}

function showTopStruct() {
  // 2. Print top-structure
  console.log("Starting ESLint configuration debug...");
  console.log("Reading plugins and configurations...");

  PLUGIN_MODULES.forEach(({ name, module }) => {
    console.log(`Plugin: ${name}`);
    console.log("Module structure:", Object.keys(module));
    console.log("---");
  });

  console.log("Finished reading plugins and configurations.");
}

// Debugging 'rules':

// 1. Hard testing: exact config object
// Check: compare_eslint.mjs && eslint.data.mjs

// 2. Soft testing: seperate, selected modular imports
// Check: eslint_debug.mjs (this file)

// 3. Live testing: seperate, selected modular imports
// - unwrap/flatten problematics configs and define them epxlicitly/seperatelly
// - check if 'SavePluginConfigs' logs/ pass correct values (with i.e.: jsonviewer.stack.hu)
// - use ESLint Inspect debug tool

SavePluginConfigs();
// showTopStruct()
