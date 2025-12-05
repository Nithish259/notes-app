import { ContextNotes } from "../context/ContextNotes";

function NoteCard({ note }) {
  const { moveToPinned, moveToTrash, moveToArchive, openEditModal } =
    ContextNotes();

  return (
    <div
      className={`p-4 w-full flex gap-x-1 rounded-xl border border-gray-300 shadow-sm hover:shadow-lg transition ${
        note.cardColor || "bg-white"
      }`}
    >
      <div className="flex flex-col w-[90%]">
        <h2 className="font-semibold text-lg">{note.title}</h2>
        <p className="text-gray-700 line-clamp-3">{note.description}</p>
        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs  bg-gray-100 px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-full bg-gray-400 mx-1"></div>

      <div className="flex flex-col w-[10%] gap-1">
        {/* Pin Button */}
        <button
          onClick={() => moveToPinned(note.id)}
          className="text-gray-600 hover:text-black"
        >
          <i
            className={`fa-solid fa-thumbtack transition ${
              note.pinned ? "rotate-45" : ""
            }`}
          ></i>
        </button>

        {/* Edit button */}
        <button
          onClick={() => openEditModal(note)}
          className="text-gray-600 hover:text-blue-600"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        {/* Archive Button */}
        <button
          onClick={() => moveToArchive(note.id)}
          className="text-gray-600 hover:text-yellow-600"
        >
          <i className="fa-solid fa-box-archive"></i>
        </button>

        {/* Delete Button */}
        <button
          onClick={() => moveToTrash(note.id)}
          className="text-gray-600 hover:text-red-600"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
