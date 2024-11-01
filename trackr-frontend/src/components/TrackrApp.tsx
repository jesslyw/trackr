import { FC, useState, useEffect} from "react";
import "./TrackrApp.css";
import { EntryTableRowProps } from "./EntryTableRow";
import { AxiosError } from "axios";
import EntryForm from "./EntryForm";
import EntryTable from "./EntryTable";
import TrackrHeader from "./TrackrHeader";
import axios from 'axios';
import { format } from "date-fns";


type EntryWithoutMethods = Omit<EntryTableRowProps, "onStatusChange" | "onSave" | "onDelete">;

const TrackrApp: FC = () => {
  // state to manage entries
  const [entries, setEntries] = useState<EntryWithoutMethods[]>([]);

  // fetch entries from backend on component mount
  useEffect(() => {
    console.log(process.env.REACT_APP_BASE_ENTRY_ENDPOINT)
    const fetchEntries = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BASE_ENTRY_ENDPOINT as string);
        console.log('Fetched response data:', response.data);
        const fetchedEntries = response.data.map((entry: any) => ({
          id: entry.id,
          name: entry.name,
          date: new Date(entry.date),
          status: entry.status.id.toString(),
          notes: entry.note
        }));
        console.log('Processed entries:', fetchedEntries);
        setEntries(fetchedEntries);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          // Handle axios error
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          } else if (error.request) {
            console.error('Request:', error.request);
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchEntries();
  }, []);

    const onSubmit = (entry : EntryWithoutMethods) => {

      // post entry to backend
      axios.post(process.env.REACT_APP_BASE_ENTRY_ENDPOINT as string, {
        id : entry.id,
        name: entry.name,
        date : format(entry.date, "yyyy-MM-dd"),
        note : entry.notes,
        status : { id: entry.status}
      })
      .then(() => {
        // add new entry to the entries state
        setEntries((prevEntries) => [...prevEntries, entry]);
      }
      )
      .catch((error: unknown) => {
        if (error instanceof AxiosError) {
            // handle axios error
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request:', error.request);
            }
        } else {
            console.error('Unexpected error:', error);
        }
    });
    }

  return (
    <div className="trackr-app-container">
      <TrackrHeader />
      <EntryForm onSubmit={onSubmit} />
      <EntryTable entryList={entries} />
    </div>
  );
};

export default TrackrApp;
