-----------------
-- BASE DB Schema
-----------------

-- create games table
CREATE TABLE IF NOT EXISTS games
(
  id         serial PRIMARY KEY,
  name       text NOT NULL,
  url        text NOT NULL,
  image_url  text NOT NULL
);

-- create destinations table
CREATE TABLE IF NOT EXISTS destinations (
    id serial PRIMARY KEY,
    city text NOT NULL,
    state text NOT NULL,
    country text NOT NULL,
    lat float NOT NULL,
    long float NOT NULL
);

-- create destination_visits table
CREATE TABLE IF NOT EXISTS destination_visits (
    id serial PRIMARY KEY,
    destination_id integer REFERENCES destinations (id),
    month integer NOT NULL,
    year integer NOT NULL
);
