import { ContextNotes } from "../context/ContextNotes";

function TrashNotes() {
  const { trashNotes, deleteNote, restoreFromTrash } = ContextNotes();

  return (
    <>
      {trashNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {trashNotes.map((note) => (
            <div
              key={note.id}
              className={`${
                note.cardColor ? note.cardColor : "bg-white"
              } p-4 rounded-xl border border-gray-300 shadow hover:shadow-md transition`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{note.title}</h2>

                <div className="flex gap-x-1">
                  <button
                    className="text-blue-500 hover:text-blue-800"
                    onClick={() => restoreFromTrash(note.id)}
                  >
                    <i className="fa-solid fa-trash-arrow-up"></i>
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>

              <p className="mt-2 text-gray-700">{note.description}</p>
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
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full pt-10">
          <p className="text-center text-gray-600 text-lg">No notes are here</p>
        </div>
      )}
    </>
  );
}

export default TrashNotes;
