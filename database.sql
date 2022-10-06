CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (250) NOT NULL,
	"gender" VARCHAR (100) NOT NULL,
	"age" INTEGER,
	"ready_to_transfer" BOOLEAN DEFAULT FALSE,
	"notes" VARCHAR (200) NOT NULL
);

INSERT INTO "koalas"
	("name", "gender", "age", "ready_to_transfer", "notes")
VALUES
	('Scotty', 'M', 4, false, 'Born in Guatemala'),
	('Jean', 'F', 5, false, 'Allergic to lots of lava'),
	('Ororo', 'F', 7, false, 'Loves listening to Paula (Abdul)'),
	('Logan', 'M', 15, false, 'Loves the sauna'),
	('Charlie', 'M', 9, false, 'Favorite band is Nirvana'),
	('Betsy', 'F', 4, false, 'Has a pet iguana');

