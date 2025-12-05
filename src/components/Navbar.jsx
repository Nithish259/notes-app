import { useLocation, useNavigate } from "react-router-dom";
import { ContextNotes } from "../context/ContextNotes";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isTrashPage = location.pathname === "/trash";
  const isArchivePage = location.pathname === "/archive";
  const { onAddOpenModal, searchInput, setSearchInput } = ContextNotes();
  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Logo */}
      <h1 className="font-serif text-2xl font-bold text-gray-700 text-center sm:text-left">
        NotesPro <i className="fa-solid fa-book-open ml-2"></i>
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        className={`w-full sm:w-1/2 h-10 bg-gray-100 border border-gray-300 px-4 rounded-md focus:outline-blue-500 ${
          isTrashPage || isArchivePage ? "hidden" : ""
        }`}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search notes..."
      />

      {/* Buttons */}
      <div
        className={`flex items-center justify-center sm:justify-end gap-3 ${
          isTrashPage || isArchivePage ? "hidden" : ""
        }`}
      >
        <button
          className="bg-yellow-600 hover:bg-yellow-700 px-4 h-10 text-white rounded-md shadow flex items-center justify-center gap-2"
          onClick={() => navigate("/archive")}
        >
          <i className="fa-solid fa-box-archive"></i> Archive
        </button>

        <button
          className="bg-red-600 hover:bg-red-700 px-4 h-10 text-white rounded-md shadow flex items-center justify-center gap-2"
          onClick={() => navigate("/trash")}
        >
          <i className="fa-solid fa-trash"></i> Trash
        </button>

        <button
          className="bg-blue-600 hover:bg-blue-700 px-5 h-10 text-white rounded-md shadow flex items-center justify-center gap-2"
          onClick={onAddOpenModal}
        >
          <i className="fa-solid fa-pen-to-square"></i> Add Note
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
