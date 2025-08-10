import { FC, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import toast from "react-hot-toast";
import EntryTableRow from "../EntryTableRow/EntryTableRow";
import { Entry } from "../../types/types";
import { deleteEntry, updateEntry } from "../../api/entries";

interface EntryTableProps {
  entryList: Entry[];
}

const EntryTable: FC<EntryTableProps> = ({ entryList }) => {
  const [entries, setEntries] = useState<Entry[]>(entryList);

  useEffect(() => {
    setEntries(entryList);
  }, [entryList]);

  const onStatusChange = (id: string, newStatus: string) => {
    setEntries((prevEntries) => {
      const updatedEntries = prevEntries.map((entry) =>
        entry.id === id ? { ...entry, status: newStatus } : entry
      );
      return updatedEntries;
    });
  };

  const onSave = async (id: string, updatedEntry: Entry) => {
    try {
      await updateEntry(id, updatedEntry);
      toast("Entry updated!");
    } catch (error) {
      toast("Error updating entry!");
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteEntry(id);
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== id)
      );
    } catch (error) {
      toast.error("Oops! Failed to delete entry");
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
