import db from "@/db";

export default async function HomePage() {
  const users = await db.query.usersTable.findMany();
  const userItems = users.map((user)=> {
    return  <div key={user.id}>{user.name}</div>
  })

  return (
    <div>
      User count: {users.length}
      {userItems}
    </div>
  )
}

