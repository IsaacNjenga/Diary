import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.resolve(process.cwd(), "data", "entries.json");

// Function to read the JSON file
const readJSONFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

export async function GET() {
  try {
    const entries = await readJSONFile(filePath);
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Failed to read entries:", error);
    return NextResponse.json(
      { error: "Failed to read entries" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const existingEntries = await readJSONFile(filePath);

    const body = await req.json();

    const newEntry = {
      id: existingEntries.length + 1,
      title: body.title,
      entry: body.entry,
      timestamp: body.timestamp,
    };

    const entries = [...existingEntries, newEntry];

    await fs.promises.writeFile(filePath, JSON.stringify(entries, null, 2));
    console.log("Entry saved successfully");

    return NextResponse.json({ message: "Entry saved!" }, { status: 201 });
  } catch (error) {
    console.error("Failed to save entry:", error);
    return NextResponse.json(
      { error: "Failed to save entry" },
      { status: 500 }
    );
  }
}
