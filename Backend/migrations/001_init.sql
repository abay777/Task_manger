-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(300) 
);
-- Create Tasks table
CREATE TABLE IF NOT EXISTS Tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,

  status ENUM('OPEN','IN_PROGRESS','DONE') NOT NULL DEFAULT 'OPEN',

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_tasks_user
    FOREIGN KEY (user_id)
    REFERENCES Users(id)
    ON DELETE CASCADE
);

-- Insert fake user for auth middleware
INSERT INTO Users (id, email)
VALUES (1, 'demo@test.com')
ON DUPLICATE KEY UPDATE email=email;

-- Helpful indexes for filtering and pagination
CREATE INDEX idx_tasks_user ON Tasks(user_id);
CREATE INDEX idx_tasks_status ON Tasks(status);
CREATE INDEX idx_tasks_created_at ON Tasks(created_at);