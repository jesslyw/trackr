import { FC, useState, useEffect } from "react";
import "./TrackrApp.css";
import EntryForm from "./EntryForm";
import EntryTable from "./EntryTable";
import TrackrHeader from "./TrackrHeader";
import { postEntry, fetchEntries } from "../api/entries";
import { useCallback } from "react";

export type Entry = {
  id: string;
  name: string;
  date: Date;
  status: string;
  notes: string;
};

const TrackrApp: FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const loadData = useCallback(async () => {
    const entries = await fetchEntries();
    setEntries(entries);
  }, []);

  // fetch entries from backend on component mount
  useEffect(() => {
    loadData().catch((error) => {
      console.log(error);
    });
  }, [loadData]);

  const onSubmit = (entry: Entry) => {
    postEntry(entry);
  };

  return (
    <div className="trackr-app-container">
      <TrackrHeader />
      <EntryForm onSubmit={onSubmit} />
      <EntryTable entryList={entries} />
    </div>
  );
};

export default TrackrApp;
