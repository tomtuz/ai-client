import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
// server.ts
import type { Collection, CollectionType } from "chromadb";
import { ChromaClient } from "chromadb";
import express from "express";

const app = express();
const client = new ChromaClient();
const COLLECTION_NAME = "codebase_files";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize and get the collection
async function getCollection(): Promise<Collection> {
	return await client.getOrCreateCollection({
		name: COLLECTION_NAME,
	});
}

// Add a single file to the collection
async function addSingleFile(filePath: string): Promise<void> {
	const collection = await getCollection();
	const fileName = path.basename(filePath);
	const fileContent = await fs.readFile(filePath, "utf-8");

	await collection.add({
		ids: [fileName],
		documents: [fileContent],
	});
}

// Add multiple files to the collection
async function addMultipleFiles(filePaths: string[]): Promise<void> {
	const collection = await getCollection();

	const fileContents = await Promise.all(
		filePaths.map(async (filePath) => {
			return fs.readFile(filePath, "utf-8");
		}),
	);

	const fileNames = filePaths.map((filePath) => path.basename(filePath));

	await collection.add({
		ids: fileNames,
		documents: fileContents,
	});
}

// Search for a query in the collection
async function searchQuery(queryText: string, nResults = 4): Promise<any> {
	const collection = await getCollection();

	return await collection.query({
		queryTexts: [queryText],
		nResults: nResults,
	});
}

// Clear the current collection
async function clearCollection(): Promise<void> {
	await client.deleteCollection({ name: COLLECTION_NAME });
	await getCollection(); // Recreate the collection
}

// Get information about the collection
async function getCollectionInfo(): Promise<{ name: string; count: number }> {
	const collection = await getCollection();
	const count = await collection.count();

	return {
		name: COLLECTION_NAME,
		count: count,
	};
}

// List all collections in the database
async function listCollections(): Promise<CollectionType[]> {
	return await client.listCollections();
}

// Get the list of indexed files
async function getIndexedFiles(): Promise<string[]> {
	const collection = await getCollection();
	const results = await collection.get();
	return results.ids as string[];
}

// app.get('/api/search', async (req, res) => {
//   const { query } = req.query;
//   if (typeof query !== 'string') {
//     return res.status(400).json({ error: 'Invalid query parameter' });
//   }
//   try {
//     const results = await searchQuery(query);
//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ error: 'Search failed' });
//   }
// });

app.get("/api/search", async (req, res) => {
	const { query } = req.query;
	if (typeof query !== "string") {
		return res.status(400).json({ error: "Invalid query parameter" });
	}
	try {
		console.log("Searching for:", query); // Log the query
		const results = await searchQuery(query);
		console.log("Search results:", results); // Log the results
		res.json(results);
	} catch (error) {
		console.error("Search failed:", error); // Log the full error
		// @ts-ignore
		res.status(500).json({ error: "Search failed", details: error.message });
	}
});

app.get("/api/indexed-files", async (req, res) => {
	try {
		const files = await getIndexedFiles();
		res.json(files);
	} catch (error) {
		res.status(500).json({ error: "Failed to get indexed files" });
	}
});

app.get("/api/collection-info", async (req, res) => {
	try {
		const info = await getCollectionInfo();
		res.json(info);
	} catch (error) {
		res.status(500).json({ error: "Failed to get collection info" });
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
