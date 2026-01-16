import { classesTable, studentsTable, usersTable } from "./schema";

export type User = typeof usersTable.$inferSelect

export type Class = typeof classesTable.$inferSelect

export type Student = typeof studentsTable.$inferSelect

export type RelatedStudent = Student & {
  user: User,
}

export type RelatedClass = Class & {
  teacher: User,
  students: RelatedStudent[]
}