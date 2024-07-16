import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.resolve(process.cwd(), "data", "entries.json");

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

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const existingEntries = await readJSONFile(filePath);
    const filteredEntries = existingEntries.filter((entry) => entry.id !== id);

    await fs.promises.writeFile(filePath, JSON.stringify(filteredEntries, null, 2));
    console.log("Entry deleted successfully");

    return NextResponse.json({ message: "Entry deleted!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete entry:", error);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, title, entry } = await req.json();

    const existingEntries = await readJSONFile(filePath);

    const updatedEntries = existingEntries.map((item) =>
      item.id === id ? { ...item, title, entry } : item
    );

    await fs.promises.writeFile(filePath, JSON.stringify(updatedEntries, null, 2));
    console.log(`Entry with id ${id} updated successfully`);

    return NextResponse.json({ message: `Entry with id ${id} updated` });
  } catch (error) {
    console.error("Failed to update entry:", error);
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}
