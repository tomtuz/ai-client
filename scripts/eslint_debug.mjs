import fs from "node:fs";
import path from "node:path";

/**
 * Saves the configuration data for the given plugin modules.
 * @param {PluginModule[]} PLUGIN_MODULES - An array of plugin modules.
 * @typedef {Object} PluginModule
 * @property {*} module - The module object (can be any type).
 * @property {string} name - The name of the plugin.
 */
export function saveConfigData(PLUGIN_MODULES) {
  const LOG_DIR = "logs";

  // Ensure log directory exists
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }

  // Replace circular refs with placeholders, so we could save a file.
  function replaceCircularRefs(obj, space = 2) {
    const seen = new WeakSet();
    return JSON.stringify(
      obj,
      (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[Circular]";
          }
          seen.add(value);
        }
        return value;
      },
      space,
    );
  }

  /**
   * @param {string} filePath - File path
   * @param {PluginModule} jsonData - A plugin module object.
   * @typedef {Object} PluginModule
   * @property {*} module - The module object (can be any type).
   * @property {string} name - The name of the plugin.
   */
  function writeJSONToFile(filePath, jsonData) {
    try {
      const data = replaceCircularRefs(jsonData);
      fs.writeFileSync(filePath, data);
      console.log(`Data saved to ${filePath}`);
    } catch (error) {
      console.error(`Error writing to ${filePath}:`, error);
    }
  }

  for (const { module, name } of PLUGIN_MODULES) {
    if (typeof module !== "object" || module === null) {
      console.warn(`Skipping invalid module: ${name}`);
      continue;
    }

    const fileName = `${name}.json`;
    const filePath = path.join(LOG_DIR, fileName);

    writeJSONToFile(filePath, module);
  }

  console.log("All configurations have been saved.");
}
