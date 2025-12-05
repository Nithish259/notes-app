import { ContextNotes } from "../context/ContextNotes";

function AddNotesModal() {
  const {
    isOpen,
    addNote,
    title,
    cardColor,
    setCardColor,
    setTitle,
    description,
    setDescription,
    onAddOpenModal,
    editNoteData,
    saveEditNote,
    tags,
    setTags,
  } = ContextNotes();

  if (!isOpen) return null;

  function colorPicking() {
    if (cardColor === "bg-red-200") {
      return "Red";
    } else if (cardColor === "bg-green-200") {
      return "Green";
    } else if (cardColor === "bg-blue-200") {
      return "Blue";
    } else if (cardColor === "bg-yellow-200") {
      return "Yellow";
    } else if (cardColor === "bg-white") {
      return "White";
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl relative">
        <div className="absolute -top-3 -right-3 bg-white w-fit rounded-full flex items-center justify-center">
          <i
            className="fa-solid fa-circle-xmark text-2xl text-red-500"
            onClick={() => onAddOpenModal()}
          ></i>
        </div>
        <h2 className="text-xl font-semibold mb-4">
          {editNoteData ? "Edit Note" : "Add New Note"}
        </h2>

        <form
          onSubmit={
            editNoteData
              ? saveEditNote
              : (e) => addNote(title, description, cardColor, e)
          }
          className="flex flex-col gap-3"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border border-gray-300 p-2 rounded-md"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border border-gray-300 p-2 rounded-md h-28"
          />

          <input
            value={tags}
            onChange={(e) => {
              const value = e.target.value;
              const words = value
                .split(",")
                .map((w) => w.trim())
                .filter((w) => w !== "");
              if (words.length <= 2) {
                setTags(value);
              }
            }}
            placeholder="Enter up to 2 tags (e.g. work, react)"
            className="border border-gray-300 p-2 rounded-md"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Note Color
            </label>

            <div className="flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-md shadow-sm bg-white">
              <div className="flex gap-x-1">
                <button
                  type="button"
                  className="bg-red-200 w-[25px] h-[25px] rounded-full border border-black"
                  onClick={() => setCardColor("bg-red-200")}
                ></button>

                <button
                  type="button"
                  className="bg-blue-200 w-[25px] h-[25px] rounded-full border border-black"
                  onClick={() => setCardColor("bg-blue-200")}
                ></button>

                <button
                  type="button"
                  className="bg-green-200 w-[25px] h-[25px] rounded-full border border-black"
                  onClick={() => setCardColor("bg-green-200")}
                ></button>

                <button
                  type="button"
                  className="bg-yellow-200 w-[25px] h-[25px] rounded-full border border-black"
                  onClick={() => setCardColor("bg-yellow-200")}
                ></button>
                <button
                  type="button"
                  className="bg-white w-[25px] h-[25px] rounded-full border border-black"
                  onClick={() => setCardColor("bg-white")}
                ></button>
              </div>
              <span className="text-gray-600 text-sm">
                {cardColor ? colorPicking() : "Pick a color"}
              </span>
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white h-10 rounded-md">
            {editNoteData ? "Edit Note " : "Add Note"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNotesModal;
