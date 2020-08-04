CREATE TABLE "user" (
  "id" uuid PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

CREATE TABLE "task" (
  "id" uuid PRIMARY KEY,
  "author_id" uuid NOT NULL,
  "title" varchar NOT NULL,
  "description" text NOT NULL,
  "notify" boolean NOT NULL,
  "left_time" datetime,
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

ALTER TABLE "plan" ADD FOREIGN KEY ("author_id") REFERENCES "user" ("id");

CREATE INDEX ON "user" ("user_id");

CREATE INDEX ON "task" ("author_id");
