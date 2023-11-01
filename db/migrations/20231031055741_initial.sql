-- migrate:up
CREATE TABLE task (
  id INTEGER PRIMARY KEY,
  content TEXT NOT NULL,
  status TEXT CHECK( status IN ("todo", "complete", "cancelled") ) NOT NULL DEFAULT "todo"
);


-- migrate:down
DROP TABLE task;
