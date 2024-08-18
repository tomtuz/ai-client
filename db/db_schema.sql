-- User Configuration Table
CREATE TABLE IF NOT EXISTS UserConfig (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL,
  value TEXT NOT NULL
);

-- Messages Table
CREATE TABLE IF NOT EXISTS Messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_message_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  type TEXT,
  role TEXT,
  model TEXT
);

-- Message Contents Table
CREATE TABLE IF NOT EXISTS MessageContents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message_id INTEGER NOT NULL,
  content_type TEXT,
  content_text TEXT,
  FOREIGN KEY (message_id) REFERENCES Messages (id)
);

-- Token Usage Table
CREATE TABLE IF NOT EXISTS TokenUsage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message_id INTEGER NOT NULL,
  input_tokens INTEGER,
  output_tokens INTEGER,
  FOREIGN KEY (message_id) REFERENCES Messages (id)
);
