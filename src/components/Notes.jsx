import { ContextNotes } from "../context/ContextNotes";
import NoteCard from "./NoteCard";

function Notes() {
  const { notes, moveToTrash, moveToPinned, searchInput } = ContextNotes();

  const filteredNotes = notes.filter((note) => {
    const textMatch =
      note.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      note.description.toLowerCase().includes(searchInput.toLowerCase());

    const tagMatch = note.tags?.some((tag) =>
      tag.toLowerCase().includes(searchInput.toLowerCase())
    );

    return textMatch || tagMatch;
  });

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const otherNotes = filteredNotes.filter((note) => !note.pinned);

  return (
    <>
      {filteredNotes.length > 0 ? (
        <div className="p-4">
          {/* PINNED SECTION */}
          {pinnedNotes.length > 0 && (
            <>
              <h2 className="text-xl font-bold mb-2">Pinned</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    moveToTrash={moveToTrash}
                    moveToPinned={moveToPinned}
                  />
                ))}
              </div>
            </>
          )}

          {/* OTHER NOTES */}
          <h2 className="text-xl font-bold mb-2">
            {pinnedNotes.length && otherNotes.length ? "Notes" : ""}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {otherNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                moveToTrash={moveToTrash}
                moveToPinned={moveToPinned}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full pt-10">
          <p className="text-center text-gray-600 text-lg">No notes are here</p>
        </div>
      )}
    </>
  );
}

export default Notes;
