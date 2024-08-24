import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import swc from "@swc/core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function processEslintData(eslint_data) {
  let output = "";
  eslint_data.forEach((config) => {
    if (!config) return;
    const {
      name = "Unnamed Config",
      plugins = {},
      settings = {},
      languageOptions = {},
      rules = {},
      ignores: glob_ignore = [],
      files: glob_files = [],
    } = config;

    output += `Plugin: ${name}\n`;
    output += `Structure: ${Object.keys(config).join(", ")}\n`;
    output += `Plugins: ${Object.keys(plugins).join(", ") || "None"}\n`;
    output += `Rules: ${Object.keys(rules).length}\n`;
    output += `Files: ${glob_files.join(", ") || "None"}\n`;
    output += `Ignores: ${glob_ignore.join(", ") || "None"}\n`;
    output += "---\n";
  });
  return output;
}

async function runNodeTest() {
  const start = process.hrtime.bigint();
  const filePath = path.join(__dirname, "eslint_data.mjs");
  const { eslint_data } = await import(
    `file://${filePath.replace(/\\/g, "/")}`
  );
  const result = processEslintData(eslint_data);
  const end = process.hrtime.bigint();
  return { time: Number(end - start) / 1e6, output: result };
}

async function runSWCTest() {
  const start = process.hrtime.bigint();
  const filePath = path.join(__dirname, "eslint_data.mjs");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { body } = await swc.parse(fileContent, {
    syntax: "typescript",
    tsx: false,
  });

  const exportDeclaration = body.find(
    (node) =>
      node.type === "ExportDeclaration" &&
      node.declaration?.type === "VariableDeclaration" &&
      node.declaration.declarations[0]?.id?.value === "eslint_data",
  );

  if (!exportDeclaration) {
    throw new Error("eslint_data export not found");
  }

  const eslint_data =
    exportDeclaration.declaration.declarations[0].init.elements;
  const result = processEslintData(eslint_data);
  const end = process.hrtime.bigint();
  return { time: Number(end - start) / 1e6, output: result };
}

async function runTests(testFn, iterations) {
  const results = [];
  for (let i = 0; i < iterations; i++) {
    const result = await testFn();
    results.push(result);
    console.log(`Iteration ${i + 1}: ${result.time.toFixed(2)}ms`);
  }
  return results;
}

function calculateStats(results) {
  const times = results.map((r) => r.time);
  const avg = times.reduce((sum, time) => sum + time, 0) / times.length;
  return {
    avg,
    min: Math.min(...times),
    max: Math.max(...times),
    output: results[0].output, // We only need one output sample
  };
}

async function saveResults(
  nodeResults,
  swcResults,
  nodeStats,
  swcStats,
  differenceMessage,
) {
  const logDir = path.join(__dirname, "logs");
  await fs.mkdir(logDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const logFile = path.join(logDir, `eslint-compare-${timestamp}.log`);

  const logContent = `
ESLint Configuration Comparison Results (${timestamp})
======================================================

Node.js Results:
${nodeResults.map((r, i) => `Iteration ${i + 1}: ${r.time.toFixed(2)}ms`).join("\n")}

SWC Results:
${swcResults.map((r, i) => `Iteration ${i + 1}: ${r.time.toFixed(2)}ms`).join("\n")}

Summary:
Node.js - Avg: ${nodeStats.avg.toFixed(2)}ms, Min: ${nodeStats.min.toFixed(2)}ms, Max: ${nodeStats.max.toFixed(2)}ms
SWC     - Avg: ${swcStats.avg.toFixed(2)}ms, Min: ${swcStats.min.toFixed(2)}ms, Max: ${swcStats.max.toFixed(2)}ms

${differenceMessage}

Processed ESLint Data:
--------------------
${nodeStats.output}

Processed SWC Data:
--------------------
${swcStats.output}
`;

  await fs.writeFile(logFile, logContent);
  console.log(`Results saved to ${logFile}`);
}

async function main() {
  const iterations = 10;
  const warmupRuns = 1;

  console.log("Running Node.js version...");
  const nodeResults = await runTests(runNodeTest, iterations);

  console.log("\nRunning SWC version...");
  const swcResults = await runTests(runSWCTest, iterations);

  const nodeStats = calculateStats(nodeResults.slice(warmupRuns));
  const swcStats = calculateStats(swcResults.slice(warmupRuns));

  console.log("\nResults (excluding warmup runs):");
  console.log(
    `Node.js - Avg: ${nodeStats.avg.toFixed(2)}ms, Min: ${nodeStats.min.toFixed(2)}ms, Max: ${nodeStats.max.toFixed(2)}ms`,
  );
  console.log(
    `SWC     - Avg: ${swcStats.avg.toFixed(2)}ms, Min: ${swcStats.min.toFixed(2)}ms, Max: ${swcStats.max.toFixed(2)}ms`,
  );

  const difference = nodeStats.avg - swcStats.avg;
  const percentageDifference = (difference / nodeStats.avg) * 100;

  let differenceMessage;
  if (difference > 0) {
    differenceMessage = `SWC is faster by ${difference.toFixed(2)}ms (${percentageDifference.toFixed(2)}%)`;
  } else if (difference < 0) {
    differenceMessage = `Node.js is faster by ${(-difference).toFixed(2)}ms (${(-percentageDifference).toFixed(2)}%)`;
  } else {
    differenceMessage = "Both methods have the same average execution time.";
  }
  console.log(differenceMessage);

  await saveResults(
    nodeResults,
    swcResults,
    nodeStats,
    swcStats,
    differenceMessage,
  );
}

main().catch(console.error);
