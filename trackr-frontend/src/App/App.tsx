import { FC, useState, useEffect } from "react";
import "./App.css";
import EntryForm from "../components/EntryForm/EntryForm";
import EntryTable from "../components/EntryTable/EntryTable";
import Header from "../components/Header/Header";
import { postEntry, getEntries } from "../api/entries";
import { useCallback } from "react";
import { Entry } from "../types/types";
import toast from "react-hot-toast";

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

  const onSubmit = async (entry: Entry) => {
    try {
      const savedEntry = await postEntry(entry);
      if (savedEntry) {
        setEntries((prevEntries) => [...prevEntries, savedEntry]);
      }
    } catch (error) {
      toast.error("Error posting entry!");
    }
  };

  return (
    <>
      <Header />
      <div className="trackr-app-container">
        <EntryForm onSubmit={onSubmit} />
        <EntryTable entryList={entries} />
      </div>
    </>
  );
};

export default App;
