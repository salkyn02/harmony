import { RelatedClass } from "@/types";
import { FC } from "react";
import { JoinClassBtn } from "./JoinClassBtn";

export const ClassList: FC<{
  classes: RelatedClass[];
  userId: number;
}> = ({ classes, userId }) => {
  const classItems = classes.map((classRow) => {
    const studentsItems = classRow.students.map((student) => {
      return <li key={student.id}>{student.user.name}</li>;
    });
    return (
      <div key={classRow.id}>
        <h3>
          Teacher: {classRow.teacher.name}{" "}
          <JoinClassBtn
            classId={classRow.id}
            students={classRow.students}
            userId={userId}
          />
        </h3>
        <ol>{studentsItems}</ol>
      </div>
    );
  });

  return <div>{classItems}</div>;
};
