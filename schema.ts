import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
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
    .references(() => usersTable.id, { onDelete: "cascade" }),
  classId: integer()
    .notNull()
    .references(() => classesTable.id, { onDelete: "cascade" }),
});

export const messagesTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  classId: integer()
    .notNull()
    .references(() => classesTable.id, { onDelete: "cascade" }),
  content: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const audiosTable = pgTable("audios", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  classId: integer()
    .notNull()
    .references(() => classesTable.id, { onDelete: "cascade" }),
  url: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  classes: many(classesTable),
  students: many(studentsTable),
  messages: many(messagesTable),
  audios: many(audiosTable),
}));

export const classesRelations = relations(classesTable, ({ one, many }) => ({
  teacher: one(usersTable, {
    fields: [classesTable.teacherUserId],
    references: [usersTable.id],
  }),
  students: many(studentsTable),
  messages: many(messagesTable),
  audios: many(audiosTable),
}));

export const studentsRelations = relations(studentsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [studentsTable.userId],
    references: [usersTable.id],
  }),
  class: one(classesTable, {
    fields: [studentsTable.classId],
    references: [classesTable.id],
  }),
}));

export const messagesRelations = relations(messagesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [messagesTable.userId],
    references: [usersTable.id],
  }),
  class: one(classesTable, {
    fields: [messagesTable.classId],
    references: [classesTable.id],
  }),
}));

export const audiosRelations = relations(audiosTable, ({one})=> ({
  user: one(usersTable, {
    fields: [audiosTable.userId],
    references: [usersTable.id],
  }),
  class: one(classesTable, {
    fields: [audiosTable.classId],
    references: [classesTable.id],
  }),
}))
