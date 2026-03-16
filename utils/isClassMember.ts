import { RelatedClass, User } from "@/types";

export default function isClassMember(user: User, relatedClass: RelatedClass) {
  const isTeacher = user.id === relatedClass.teacherUserId;

  const isStudent = relatedClass.students.some((student) => {
    return student.userId === user.id;
  });

  const isMember = isTeacher || isStudent;
  return isMember;
}
