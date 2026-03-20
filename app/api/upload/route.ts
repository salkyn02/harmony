import db from "@/db";
import { audiosTable } from "@/schema";
import authenticate from "@/utils/authenticate";
import { v2 } from "cloudinary";
import { NextResponse } from "next/server";
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
export async function POST(request: Request) {
  const user = await authenticate();
  const formData = await request.formData();
  const classId = formData.get("classId");
  if (typeof classId !== "string") {
    return NextResponse.json(
      {
        message: "Class Id missing",
      },
      {
        status: 400,
      },
    );
  }
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      {
        message: "File missing",
      },
      {
        status: 400,
      },
    );
  }
  const array = await file.arrayBuffer();
  const buffer = Buffer.from(array);
  const base64 = buffer.toString("base64");
  const dataURI = `data:${file.type};base64,${base64}`;

  const result = await v2.uploader.upload(dataURI, {
    resource_type: "video",
  });
  await db
    .insert(audiosTable)
    .values({ userId: user.id, url: result.url, classId: Number(classId) });
  return NextResponse.json(result);
}
