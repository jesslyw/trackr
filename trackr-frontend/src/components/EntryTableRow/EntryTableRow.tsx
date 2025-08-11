import { FC, useState } from "react";
import Button from "react-bootstrap/Button";
import { Entry } from "../../types/types";
import "./EntryTableRow.css";

export interface EntryTableRowProps {
  id: string; //uuid
  name: string;
  date: string;
  status: string;
  notes: string;
  onStatusChange: (id: string, newStatus: string) => void;
  onSave: (id: string, updatedEntry: Entry) => void;
  onDelete: (id: string) => void;
}

const TrashIcon = () => (
  // <?xml version="1.0" encoding="utf-8"?>
  // <!-- License: Apache. Made by Iconscout: https://github.com/Iconscout/unicons -->
  <svg
    fill="white"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z" />
  </svg>
);

const EntryTableRow: FC<EntryTableRowProps> = ({
  id,
  name,
  date,
  status,
  notes,
  onSave,
  onDelete,
}) => {
  const [editedEntry, setEditedEntry] = useState<Entry>({
    id,
    name,
    date,
    status,
    notes,
  });
  const [editingField, setEditingField] = useState("");

  const statusMap: Record<string, string> = {
    "1": "Yes",
    "2": "No",
    "3": "Pending",
  };

  return (
    <tr>
      <td>
        {editingField === "name" ? (
          <input
            type="text"
            value={editedEntry.name}
            onChange={(e) =>
              setEditedEntry({ ...editedEntry, name: e.target.value })
            }
            onBlur={() => {
              if (editedEntry.id) {
                onSave(editedEntry.id, editedEntry);
              }
              setEditingField("");
            }}
            autoFocus
          />
        ) : (
          <span className="name-cell" onClick={() => setEditingField("name")}>
            {name}
          </span>
        )}
      </td>
      <td>{date}</td>
      <td>
        {editingField === "status" ? (
          <select
            value={editedEntry.status}
            onChange={(e) =>
              setEditedEntry({ ...editedEntry, status: e.target.value })
            }
            onBlur={() => {
              onSave(editedEntry.id, editedEntry);
              setEditingField("");
            }}
            autoFocus
            className="form-control"
          >
            <option value="1">Yes</option>
            <option value="2">No</option>
            <option value="3">Pending</option>
          </select>
        ) : (
          <span onClick={() => setEditingField("status")}>
            {statusMap[status]}
          </span>
        )}
      </td>
      <td className="notes-cell">
        {editingField === "notes" ? (
          <textarea
            value={editedEntry.notes}
            onChange={(e) =>
              setEditedEntry({ ...editedEntry, notes: e.target.value })
            }
            onBlur={() => {
              onSave(editedEntry.id, editedEntry);
              setEditingField("");
            }}
            autoFocus
          />
        ) : (
          <span onClick={() => setEditingField("notes")}>{notes}</span>
        )}
      </td>
      <td>
        <Button type="button" variant="secondary" onClick={() => onDelete(id)}>
          <TrashIcon />
        </Button>
      </td>
    </tr>
  );
};

export default EntryTableRow;
