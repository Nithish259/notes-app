import { createContext, useContext, useEffect, useState } from "react";

const NotesContext = createContext();

export function ContextNote({ children }) {
  const [description, setDescription] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [title, setTitle] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [tags, setTags] = useState("");

  //  Load notes from LocalStorage on first render
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [trashNotes, setTrashNotes] = useState(() => {
    const saved = localStorage.getItem("trashNotes");
    return saved ? JSON.parse(saved) : [];
  });

  const [archiveNotes, setArchiveNotes] = useState(() => {
    const saved = localStorage.getItem("archiveNotes");
    return saved ? JSON.parse(saved) : [];
  });

  const [editNoteData, setEditNoteData] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(true);

  // ================================
  // Save notes to LocalStorage whenever they change
  // ================================

  useEffect(() => {
    localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));
  }, [archiveNotes]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
  }, [trashNotes]);

  // ================================
  // FUNCTIONS
  // ================================

  function onAddOpenModal() {
    setIsOpen(!isOpen);
    setEditNoteData(null);
    setTitle("");
    setDescription("");
    setCardColor("");
    setTags("");
  }

  function moveToArchive(noteId) {
    const archive = notes.find((n) => n.id === noteId);
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    setArchiveNotes((prev) => [...prev, archive]);
  }

  function unArchive(noteId) {
    const restore = archiveNotes.find((n) => n.id === noteId);
    setArchiveNotes((prev) => prev.filter((n) => n.id !== noteId));
    setNotes((prev) => [...prev, restore]);
  }

  function restoreFromTrash(noteId) {
    const restore = trashNotes.find((n) => n.id === noteId);
    setTrashNotes((prev) => prev.filter((n) => n.id !== noteId));
    setNotes((prev) => [...prev, restore]);
  }

  function openEditModal(note) {
    if (!note) return;
    setEditNoteData(note);
    setTitle(note.title || "");
    setDescription(note.description || "");
    setCardColor(note.cardColor || "");
    setTags((note.tags && note.tags.join(", ")) || "");
    setIsOpen(true);
  }

  function saveEditNote(e) {
    e.preventDefault();
    if (!editNoteData) return;

    const updatedTags = tags
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    setNotes((prev) =>
      prev.map((n) =>
        n.id === editNoteData.id
          ? {
              ...n,
              title,
              description,
              cardColor,
              tags: updatedTags,
            }
          : n
      )
    );

    setEditNoteData(null);
    setTitle("");
    setDescription("");
    setCardColor("");
    setTags("");
    setIsOpen(false);
  }

  function addNote(title, description, cardColor, e) {
    e.preventDefault();

    const note = {
      id: crypto.randomUUID(),
      title,
      description,
      cardColor,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      pinned: false,
    };

    setNotes((prev) => [...prev, note]);

    setTitle("");
    setDescription("");
    setCardColor("");
    setTags("");
    onAddOpenModal();
  }

  function moveToTrash(noteId) {
    const movedToTrash = notes.find((note) => note.id === noteId);
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
    setTrashNotes((prev) => [...prev, movedToTrash]);
  }

  function moveToPinned(noteId) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, pinned: !note.pinned } : note
      )
    );
  }

  function deleteNote(noteId) {
    setTrashNotes((prev) => prev.filter((note) => note.id !== noteId));
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        clicked,
        setClicked,
        trashNotes,
        title,
        setTitle,
        setDescription,
        searchInput,
        setSearchInput,
        description,
        cardColor,
        setCardColor,
        addNote,
        moveToTrash,
        moveToPinned,
        deleteNote,
        onAddOpenModal,
        isOpen,
        openEditModal,
        editNoteData,
        saveEditNote,
        moveToArchive,
        unArchive,
        restoreFromTrash,
        archiveNotes,
        tags,
        setTags,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function ContextNotes() {
  return useContext(NotesContext);
}
