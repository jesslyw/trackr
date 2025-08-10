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

const EntryTableRow: FC<EntryTableRowProps> = ({
  id,
  name,
  date,
  status,
  notes,
  onStatusChange,
  onSave,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
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
      {/* <td>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (isEditing) {
              onSave(id, editedEntry);
            }
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </td> */}
      <td>
        <Button type="button" variant="secondary" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default EntryTableRow;
