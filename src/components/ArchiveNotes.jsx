import { ContextNotes } from "../context/ContextNotes";

function ArchiveNotes() {
  const { archiveNotes, unArchive } = ContextNotes();

  return (
    <>
      {archiveNotes.length > 0 ? (
        <>
          <h1 className="text-xl font-bold px-4 mt-2">Archived Notes</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {archiveNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-4 rounded-xl border border-gray-300 shadow hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">{note.title}</h2>

                  <button
                    onClick={() => unArchive(note.id)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    <i className="fa-solid fa-box-open"></i>
                  </button>
                </div>

                <p className="mt-2 text-gray-700">{note.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full pt-10">
          <p className="text-center text-gray-600 text-lg">No notes are here</p>
        </div>
      )}
    </>
  );
}

export default ArchiveNotes;
