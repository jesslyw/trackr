import { FC } from "react";
import Button from "react-bootstrap/Button";

export interface EntryTableRowProps {
    id: string, //uuid
    name : string;
    date : Date;
    status : string;
    notes : string;
    onStatusChange: (id: string, newStatus: string) => void;
    onSave: (id: string) => void;
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
    onDelete
}) => {
return (
<tr>
    <td>{name}</td>
    <td>{date.toDateString()}</td>
    <td>
                <select
                    value={status}
                    onChange={(e) => onStatusChange(id, e.target.value)} // call the change handler
                    className="form-control"
                >
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                    <option value="3">Pending</option>

                </select>
            </td>
    <td>{notes}</td>
    <td><Button type="button" variant="secondary" onClick={() => onSave(id)}>Save</Button></td>
    <td><Button type="button" variant="secondary" onClick={() => onDelete(id)}>Delete</Button></td>
</tr>
);
}

export default EntryTableRow;