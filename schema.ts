import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  password: text().notNull(),
});

export const classesTable = pgTable("classes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  teacherUserId: integer()
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
});

export const studentsTable = pgTable("students", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => classesTable.id, { onDelete: "cascade" }),
  classId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  classes: many(classesTable),
  students: many(studentsTable),
}));

export const classesRelations = relations(usersTable, ({ one, many }) => ({
  teacher: one(usersTable),
  students: many(studentsTable),
}));

export const studentsRelations = relations(usersTable, ({ one, many }) => ({
  user: one(usersTable),
  class: one(classesTable),
}));
