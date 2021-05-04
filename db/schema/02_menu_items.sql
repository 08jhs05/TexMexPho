DROP TABLE IF EXISTS menu_items CASCADE;
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  photo_url VARCHAR(255),
  description TEXT,
  option_recommanded BOOLEAN DEFAULT false,
  option_spiciness INTEGER DEFAULT 0,
  availabillity BOOLEAN DEFAULT true
);