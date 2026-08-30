/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Automation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Assignee" DROP CONSTRAINT "Assignee_automation_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignee" DROP CONSTRAINT "Assignee_user_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Automation_name_key" ON "Automation"("name");

-- AddForeignKey
ALTER TABLE "Assignee" ADD CONSTRAINT "Assignee_automation_id_fkey" FOREIGN KEY ("automation_id") REFERENCES "Automation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignee" ADD CONSTRAINT "Assignee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
