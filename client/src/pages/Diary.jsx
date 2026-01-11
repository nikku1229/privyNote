import { useEffect, useState, useRef } from "react";
import API from "../api/axios";

const Diary = () => {
  const [content, setContent] = useState("");
  const [diaries, setDiaries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [mode, setMode] = useState("create");
  const typingTimeout = useRef(null);

  const token = localStorage.getItem("token");

  const fetchDiaries = async () => {
    const res = await API.get("/diary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDiaries(res.data);
  };

  const saveDiary = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    if (editingId) {
      await API.put(
        `/diary/${editingId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
    } else {
      await API.post(
        "/diary",
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setContent("");
    fetchDiaries();
  };

  const deleteDiary = async (id) => {
    if (!confirm("Delete this note?")) return;

    await API.delete(`/diary/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // setMode("create");
    // setContent("");
    fetchDiaries();
  };

  const filteredDiaries = diaries.filter((d) =>
    d.content.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchDiaries();
  }, []);

  useEffect(() => {
    if (mode !== "edit") return;
    if (!content.trim()) return;

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(async () => {
      await API.put(
        `/diary/${editingId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }, 1000);

    return () => clearTimeout(typingTimeout.current);
  }, [content, mode]);

  return (
    <div className="app-container diary-container">
      <h2>My Diary</h2>

      <div className="diary-editor">
        {/* CREATE MODE */}
        {mode === "create" && (
          <form onSubmit={saveDiary}>
            <textarea
              className="diary-textarea"
              placeholder="Write your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Save Note</button>
          </form>
        )}

        {/* VIEW MODE */}
        {mode === "view" && selectedDiary && (
          <div className="diary-view">
            <p>{selectedDiary.content}</p>
            <small>{new Date(selectedDiary.createdAt).toLocaleString()}</small>

            <div className="actions">
              <button onClick={() => setMode("edit")}>Edit</button>
              <button
                className="danger"
                onClick={() => deleteDiary(selectedDiary._id)}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {mode === "edit" && (
          <form onSubmit={saveDiary}>
            <textarea
              className="diary-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Update Note</button>
          </form>
        )}
      </div>

      <input
        className="search-input"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="diary-list">
        {filteredDiaries.map((d) => (
          <div
            className="diary-entry"
            key={d._id}
            onClick={() => {
              setSelectedDiary(d);
              setContent(d.content);
              setEditingId(d._id);
              setMode("view");
            }}
          >
            <p>{d.content}</p>
            <small>{new Date(d.createdAt).toLocaleString()}</small>

            <div className="actions">
              <button onClick={() => deleteDiary(d._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diary;
