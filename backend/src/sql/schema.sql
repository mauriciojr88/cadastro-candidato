CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS candidates (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  cep VARCHAR(20),
  logradouro VARCHAR(255),
  bairro VARCHAR(255),
  cidade VARCHAR(255),
  uf VARCHAR(10),
  cv_filename VARCHAR(255),
  cv_mimetype VARCHAR(100),
  cv_size INTEGER,
  cv_text TEXT,
  is_scanned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
