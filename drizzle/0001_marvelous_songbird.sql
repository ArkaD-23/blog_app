CREATE TABLE IF NOT EXISTS "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"blogtitle" varchar(100) NOT NULL,
	"authorname" varchar(100) NOT NULL,
	"blogcontent" varchar(600) NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
