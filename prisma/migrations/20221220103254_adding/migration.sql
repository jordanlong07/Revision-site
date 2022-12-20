-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AcronymQuestions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "tags" TEXT,
    "selected" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_AcronymQuestions" ("answer", "id", "question", "tags") SELECT "answer", "id", "question", "tags" FROM "AcronymQuestions";
DROP TABLE "AcronymQuestions";
ALTER TABLE "new_AcronymQuestions" RENAME TO "AcronymQuestions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
