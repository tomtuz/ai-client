import sqlite3 from "sqlite3";
import { MessageContents } from "../src/types/chat";

const db = new sqlite3.Database('./db/main.db');

function insertUserConfig(config) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO UserConfig (key, value) VALUES (?, ?)",
      [config.key, config.value],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

function insertMessage(conversationId: string, messageData: MessageContents) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO Messages (api_message_id, conversation_id, type, role, model) 
            VALUES (?, ?, ?, ?, ?)`,
      [messageData.id, conversationId, messageData.type, messageData.role, messageData.model],
      function (err) {
        if (err) {
          reject(err);
        } else {
          const messageId = this.lastID;

          // Insert message contents
          const contentPromises = messageData.content.map(content => {
            return db.run(`INSERT INTO MessageContents (message_id, content_type, content_text) 
                           VALUES (?, ?, ?)`,
              [messageId, content.type, content.text]);
          });

          // Insert token usage
          const tokenPromise = db.run(`INSERT INTO TokenUsage (message_id, input_tokens, output_tokens) 
                                       VALUES (?, ?, ?)`,
            [messageId, messageData.tokens?.input, messageData.tokens?.output]);

          Promise.all([...contentPromises, tokenPromise])
            .then(() => resolve(messageId))
            .catch(reject);
        }
      }
    );
  });
}

const userConfig = {
  key: 'user_preference',
  value: 'dark_mode'
};

const messageData: MessageContents = {
  id: 'api_message_id_123',
  type: 'text',
  role: 'assistant',
  model: 'gpt-3.5-turbo',
  content: [{ type: 'text', text: 'Hello, how can I assist you today?' }],
  tokens: { input: 10, output: 20 }
};

insertUserConfig(userConfig)
  .then(() => insertMessage('1', messageData))
  .then(messageId => console.log(`Message inserted with ID: ${messageId}`))
  .catch(err => console.error('Error setting up database:', err))
  .finally(() => db.close());
