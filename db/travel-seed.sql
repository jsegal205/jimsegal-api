--
-- Destinations seed file
--

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

-- create function for converting integers to months
drop function if exists to_month(integer);
create function to_month(integer) returns varchar as
$$
    select to_char(to_timestamp(to_char($1, '999'), 'MM'), 'Month');
$$ language sql;

-- try to start seeding destinations and destination visits tables
DO $$
DECLARE
  rowcount integer := count(id) FROM destinations;
BEGIN
  IF rowcount > 0 THEN
    RAISE NOTICE 'Destinations table already populated. Skipping seeding...';
  ELSE
    DO '
    DECLARE
        destId integer;
    BEGIN
        INSERT INTO destinations ("city", "state", "country", "lat", "long")
            VALUES (''St. Pete Beach'',''FL'',''USA'',27.739783,-82.752435)
            RETURNING id INTO destId;
        INSERT INTO destination_visits (destination_id, month, year)
        VALUES  (destId, 10, 2011),
                (destId, 5, 2008);

        INSERT INTO destinations ("city", "state", "country", "lat", "long")
            VALUES (''New Orleans'',''LA'',''USA'',29.959882,-90.067956)
            RETURNING id INTO destId;
        INSERT INTO destination_visits (destination_id, month, year)
            VALUES  (destId, 10, 2017);
    END ';

    RAISE NOTICE 'Destinations table seeded';
  END IF;
END $$;
