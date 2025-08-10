import EntryTableRow, { EntryTableRowProps } from "./EntryTableRow";
import { FC, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";

type EntryWithoutMethods = Omit<
  EntryTableRowProps,
  "onStatusChange" | "onSave" | "onDelete"
>;

interface EntryTableProps {
  entryList: EntryWithoutMethods[];
}

const EntryTable: FC<EntryTableProps> = ({ entryList }) => {
  const [entries, setEntries] = useState<EntryWithoutMethods[]>(entryList); // manage state of table entries

  useEffect(() => {
    setEntries(entryList);
  }, [entryList]);

  const onStatusChange = (id: string, newStatus: string) => {
    console.log("Before update:", entries);
    console.log("new status:", newStatus);
    setEntries((prevEntries) => {
      const updatedEntries = prevEntries.map((entry) =>
        entry.id === id ? { ...entry, status: newStatus } : entry
      );
      console.log("After update:", updatedEntries);
      return updatedEntries;
    });
  };

  const onSave = async (id: string, updatedEntry: EntryWithoutMethods) => {
    try {
      // quick fix to match expected object,
      // until status shape is refactored in EntryTableRow interface
      const requestBody = {
        id: updatedEntry.id,
        name: updatedEntry.name,
        date: format(updatedEntry.date, "yyyy-MM-dd"),
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
        toast("Entry updated!");
      } else {
        toast("Error updating entry!");
        throw new Error("Failed to save entry");
      }
    } catch (error: any) {
      console.error(`Error updating entry ${id} : ${error.message}`);
      toast("Error updating entry!");
    }
  };

  const onDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_ENTRY_ENDPOINT}/${id}`
      );
      if (response.status === 204) {
        console.log(`Entry with id ${id} deleted successfully.`);
        toast("Entry deleted successfully!");
        // only remove from state after successful deletion
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.id !== id)
        );
      }
    } catch (error: any) {
      console.error(`Error deleting entry ${id} : ${error.message}`);
      toast("Error deleting entry!");
    }
  };

  return (
    <Table bordered hover>
      <thead className="thead-light">
        <tr>
          <th scope="col">name</th>
          <th scope="col">date</th>
          <th scope="col">status</th>
          <th scope="col">notes</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {/* table entry rows go here  */}
        {entries.length > 0 ? (
          entries.map((entry) => (
            <EntryTableRow
              key={entry.id}
              id={entry.id}
              name={entry.name}
              date={entry.date}
              status={entry.status}
              notes={entry.notes}
              onStatusChange={onStatusChange}
              onSave={() => onSave(entry.id, entry)}
              onDelete={() => onDelete(entry.id)}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5}>
              No entries available yet! Use the form to get started.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default EntryTable;
