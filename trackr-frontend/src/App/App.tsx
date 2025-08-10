import { FC, useState, useEffect } from "react";
import "./App.css";
import EntryForm from "../components/EntryForm/EntryForm";
import EntryTable from "../components/EntryTable/EntryTable";
import Header from "../components/Header/Header";
import { postEntry, getEntries } from "../api/entries";
import { useCallback } from "react";
import { Entry } from "../types/types";

const App: FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const loadData = useCallback(async () => {
    const entries = await getEntries();
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
      <Header />
      <EntryForm onSubmit={onSubmit} />
      <EntryTable entryList={entries} />
    </div>
  );
};

export default App;
