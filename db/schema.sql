CREATE TABLE IF NOT EXISTS "schema_migrations" (version varchar(128) primary key);
CREATE TABLE task (
  id INTEGER PRIMARY KEY,
  content TEXT NOT NULL,
  status TEXT CHECK( status IN ("todo", "complete", "cancelled") ) NOT NULL DEFAULT "todo"
);
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20231031055741');
