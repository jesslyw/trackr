import { useState, FC, ChangeEvent, FormEvent } from "react";
import { EntryTableRowProps } from "./EntryTableRow";
import { v4 as uuidv4 } from "uuid";
import "./EntryForm.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormControl, FormGroup } from "react-bootstrap";

interface EntryFormProps {
  onSubmit: (
    entry: Omit<EntryTableRowProps, "onStatusChange" | "onSave" | "onDelete">
  ) => void;
}

// relevant fields for entry form
type EntryFormState = Omit<
  EntryTableRowProps,
  "id" | "onStatusChange" | "onSave" | "onDelete"
>;

const EntryForm: FC<EntryFormProps> = ({ onSubmit }) => {
  const [entry, setEntry] = useState<EntryFormState>({
    name: "",
    date: new Date(),
    status: "",
    notes: "",
  });

  // to update the local state
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: name === "date" ? new Date(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const entryWithId = { ...entry, id: uuidv4() };
    onSubmit(entryWithId); // generate id and pass entry to parent
    setEntry({ name: "", date: new Date(), status: "", notes: "" });
  };

  return (
    <Form id="input-form" onSubmit={handleSubmit}>
      <Row>
        <FormGroup as={Col}>
          <Form.Label htmlFor="name">name</Form.Label>
          <FormControl
            type="text"
            id="name"
            className="form-control"
            name="name"
            value={entry.name} // bind field to state
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup as={Col}>
          <Form.Label htmlFor="status">status</Form.Label>
          <Form.Select
            id="status"
            className="form-control"
            name="status"
            value={entry.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="2">No</option>
            <option value="3">Pending</option>
          </Form.Select>
        </FormGroup>

        <FormGroup as={Col}>
          <Form.Label htmlFor="date">date</Form.Label>
          <FormControl
            type="date"
            id="date"
            className="form-control"
            name="date"
            onChange={handleInputChange}
            required
          />
        </FormGroup>
      </Row>

      <Row>
        <Col>
          <label htmlFor="notes">notes</label>
          <FormControl
            id="notes"
            className="form-control"
            name="notes"
            value={entry.notes}
            onChange={handleInputChange}
          />
        </Col>
      </Row>

      <Button type="submit" variant="dark">
        Add
      </Button>
    </Form>
  );
};

export default EntryForm;
