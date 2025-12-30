"use client";

export default function CreateClassBtn() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/create-class", { method: "POST" });
      }}
    >
      Create class
    </button>
  );
}
