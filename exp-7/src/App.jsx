
import { useState } from "react";
import "./App.css";

function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editId, setEditId] = useState(null);

    // Add or update a note
    function saveNote(e) {
        e.preventDefault();

        if (title.trim() === "" || content.trim() === "") {
            alert("Please enter both title and content.");
            return;
        }

        if (editId !== null) {
            setNotes(notes.map(note =>
                note.id === editId
                    ? { ...note, title, content }
                    : note
            ));
            setEditId(null);
        } else {
            const newNote = {
                id: Date.now(),
                title: title,
                content: content
            };

            setNotes([...notes, newNote]);
        }

        setTitle("");
        setContent("");
    }

    // Edit a note
    function editNote(note) {
        setTitle(note.title);
        setContent(note.content);
        setEditId(note.id);
    }

    // Delete a note
    function deleteNote(id) {
        setNotes(notes.filter(note => note.id !== id));
    }

    return (
        <div className="app">
            <h1>My Notes</h1>
            <p className="subtitle">Write down your thoughts and ideas.</p>

            <form onSubmit={saveNote} className="note-form">
                <input
                    type="text"
                    placeholder="Enter note title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Write your note here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type="submit">
                    {editId !== null ? "Update Note" : "Add Note"}
                </button>

                {editId !== null && (
                    <button
                        type="button"
                        className="cancel"
                        onClick={() => {
                            setEditId(null);
                            setTitle("");
                            setContent("");
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <h2>My Saved Notes</h2>

            <div className="notes-container">
                {notes.length === 0 ? (
                    <p className="empty">No notes added yet.</p>
                ) : (
                    notes.map(note => (
                        <div className="note" key={note.id}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>

                            <button onClick={() => editNote(note)}>
                                Edit
                            </button>

                            <button
                                className="delete"
                                onClick={() => deleteNote(note.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
