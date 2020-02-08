-- DB migrations

ALTER TABLE IF EXISTS games ADD COLUMN "bgg_id" integer NOT NULL DEFAULT -1;
