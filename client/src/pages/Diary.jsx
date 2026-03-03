import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import ViewDiary from "../components/ViewDiary";
import Loader from "../components/Loader";
import { useLoading } from "../context/LoadingContext";
import SearchIcon from "../assets/Icons/SearchIcon.svg?react";
import PencilIcon from "../assets/Icons/PencilIcon.svg?react";
import DeleteIcon from "../assets/Icons/DeleteIcon.svg?react";
import CrossIcon from "../assets/Icons/CrossIcon.svg?react";

const Diary = () => {
  const [content, setContent] = useState("");
  const [diaries, setDiaries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [mode, setMode] = useState("create");
  const typingTimeout = useRef(null);
  const textareaRef = useRef(null);

  // const token = localStorage.getItem("token");

  const { setToast } = useAuth();
  const { loading, setLoading } = useLoading();

  const fetchDiaries = async () => {
    try {
      setLoading(true);
      const res = await API.get("/diary", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      setDiaries(res.data);
    } catch (err) {
      setLoading(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveDiary = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    if (editingId) {
      try {
        setLoading(true);
        await API.put(
          `/diary/${editingId}`,
          { content },
          // { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

      setEditingId(null);
      setToast("Notes Updated");
      setTimeout(() => {
        setToast("");
      }, 2000);
      setMode("create");
    } else {
      try {
        setLoading(true);
        await API.post(
          "/diary",
          { content },
          // { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

      setToast("Notes Saved");
      setTimeout(() => {
        setToast("");
      }, 2000);
      setMode("create");
    }

    setContent("");
    fetchDiaries();
  };

  const deleteDiary = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      setLoading(true);
      await API.delete(`/diary/${id}`, {
        // headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    setToast("Delete Successful");
    setTimeout(() => {
      setToast("");
    }, 2000);

    setMode("create");
    setContent("");
    setEditingId(null);
    fetchDiaries();
  };

  const filteredDiaries = diaries.filter((d) =>
    d.content.toLowerCase().includes(search.toLowerCase()),
  );

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  useEffect(() => {
    if (mode !== "edit") return;
    if (!content.trim()) return;

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(async () => {
      try {
        setLoading(true);
        await API.put(
          `/diary/${editingId}`,
          { content },
          // { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(typingTimeout.current);
  }, [content, mode, editingId]);

  useEffect(() => {
    autoResizeTextarea();
  }, [content]);

  useEffect(() => {
    fetchDiaries();
  }, []);

  return (
    <>
      <div className="dashboard-main">
        <div className="main-container diary-dashboard">
          <div className="diary-container">
            <div className="diary-field">
              <form onSubmit={saveDiary}>
                <textarea
                  ref={textareaRef}
                  placeholder="Write your thoughts....."
                  rows={1}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  style={{ overflow: "hidden", resize: "none" }}
                />
                {mode === "edit" && (
                  <button
                    className="cancel-edit-btn"
                    onClick={() => {
                      setMode("create");
                      setContent("");
                      setEditingId(null);
                    }}
                  >
                    <CrossIcon />
                  </button>
                )}
                <button type={loading ? "button" : "submit"}>
                  {editingId ? "Update" : "Save"}
                </button>
              </form>
            </div>
            <div className="search-bar-section">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  className="search-input"
                  placeholder="Search notes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">
                  <SearchIcon className="icon" />
                </button>
              </form>
            </div>

            <div className="diary-list-section">
              {loading ? (
                <>
                  <Loader></Loader>
                </>
              ) : (
                <>
                  {(mode === "create" || mode === "edit") &&
                    filteredDiaries.map((d) => (
                      <div
                        className="diary-entry"
                        key={d._id}
                        onClick={() => {
                          setSelectedDiary(d);
                          setMode("view");
                        }}
                      >
                        <div className="content">
                          <p>{d.content}</p>
                          <small>
                            {new Date(d.createdAt).toLocaleString()}
                          </small>
                        </div>
                        <div className="diary-entry-btn">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setContent(d.content);
                              setEditingId(d._id);
                              setMode("edit");
                            }}
                          >
                            <PencilIcon className="icon" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteDiary(d._id);
                            }}
                          >
                            <DeleteIcon className="icon" />
                          </button>
                        </div>
                      </div>
                    ))}
                </>
              )}
              {mode === "view" && selectedDiary && (
                <>
                  <ViewDiary
                    selectedDiary={selectedDiary}
                    setMode={setMode}
                    deleteDiary={deleteDiary}
                    setContent={setContent}
                    setEditingId={setEditingId}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diary;
