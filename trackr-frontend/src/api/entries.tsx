import axios from "axios";
import { Entry } from "../types/types";

export async function getEntries() {
  console.log("fetching");
  console.log("API URL:", import.meta.env.VITE_BASE_ENTRY_ENDPOINT);
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_ENTRY_ENDPOINT as string
    );
    // status 2xx
    const fetchedEntries = response.data.map((entry: any) => ({
      id: entry.id,
      name: entry.name,
      date: entry.date,
      status: entry.status.id.toString(),
      notes: entry.note,
    }));
    return fetchedEntries;
  } catch (error) {
    console.log("Error fetching entries:", error);
    return [];
  }
}

export async function postEntry(entry: Entry) {
  try {
    await axios.post(import.meta.env.VITE_BASE_ENTRY_ENDPOINT as string, {
      id: entry.id,
      name: entry.name,
      date: entry.date,
      note: entry.notes,
      status: { id: entry.status },
    });
    return entry;
  } catch (error) {
    console.log("Error posting entry:", error);
  }
}

export async function deleteEntry(id: string) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_ENTRY_ENDPOINT}/${id}`
    );
    if (response.status === 204) {
      console.log(`Entry with id ${id} deleted successfully.`);
    }
  } catch (error: any) {
    console.error(`Error deleting entry ${id}: ${error.message}`);
  }
}

export async function updateEntry(id: string, updatedEntry: Entry) {
  try {
    const requestBody = {
      id: updatedEntry.id,
      name: updatedEntry.name,
      date: updatedEntry.date,
      note: updatedEntry.notes,
      status: {
        id: updatedEntry.status,
      },
    };

    const response = await axios.put(
      `${import.meta.env.VITE_BASE_ENTRY_ENDPOINT}/${id}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log(`Entry with id ${id} saved successfully.`);
    }
  } catch (error: any) {
    console.error(`Error updating entry ${id}: ${error.message}`);
  }
}
