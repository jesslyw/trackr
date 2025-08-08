import axios from "axios";
import { Entry } from "../components/TrackrApp";

export async function fetchEntries() {
  console.log("fetching");
  console.log("API URL:", import.meta.env.VITE_BASE_ENTRY_ENDPOINT);
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_ENTRY_ENDPOINT as string
    );
    // status 2xx
    console.log("Fetched response data:", response.data);
    const fetchedEntries = response.data.map((entry: any) => ({
      id: entry.id,
      name: entry.name,
      date: entry.date,
      status: entry.status.id.toString(),
      notes: entry.note,
    }));
    console.log("Fetched entries:", fetchedEntries);
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
  } catch (error) {
    console.log("Error posting entry:", error);
  }
}
