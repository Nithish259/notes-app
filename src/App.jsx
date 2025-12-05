import "./App.css";
import AddNotesModal from "./components/AddNotesModal";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import { Routes, Route } from "react-router-dom";
import TrashNotes from "./components/TrashNotes";
import ArchiveNotes from "./components/ArchiveNotes";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full min-h-screen bg-gray-200">
            <Navbar />
            <div className="relative">
              <Notes />
              <AddNotesModal />
            </div>
          </div>
        }
      />
      <Route
        path="trash"
        element={
          <div className="w-full min-h-screen bg-gray-200">
            <Navbar />
            <TrashNotes />
          </div>
        }
      />
      <Route
        path="/archive"
        element={
          <div className="w-full min-h-screen bg-gray-200">
            <Navbar />
            <ArchiveNotes />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
