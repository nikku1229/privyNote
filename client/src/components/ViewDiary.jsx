import React from "react";
import PencilIcon from "../assets/Icons/PencilIcon.svg?react";
import DeleteIcon from "../assets/Icons/DeleteIcon.svg?react";
import CrossIcon from "../assets/Icons/CrossIcon.svg?react";

function ViewDiary({
  selectedDiary,
  setMode,
  deleteDiary,
  setContent,
  setEditingId,
}) {
  const getLimitedTitle = (text) => {
    return text.split("\n")[0].slice(0, 50);
  };

  return (
    <div className="viewmode-diary-section">
      <div className="viewmode-diary-head">
        <h3 className="viewmode-diary-title">
          {getLimitedTitle(selectedDiary.content) + "..."}
        </h3>
        <div className="viewmode-diary-btns">
          <button
            onClick={() => {
              setContent(selectedDiary.content);
              setEditingId(selectedDiary._id);
              setMode("edit");
            }}
          >
            <PencilIcon className="icon" />
          </button>
          <button
            onClick={() => {
              deleteDiary(selectedDiary._id);
              setMode("create");
            }}
          >
            <DeleteIcon className="icon" />
          </button>
          <button className="close-btn" onClick={() => setMode("create")}>
            <CrossIcon className="icon" />
          </button>
        </div>
      </div>
      <div className="viewmode-diary-main">
        <p>{selectedDiary.content}</p>
      </div>
    </div>
  );
}

export default ViewDiary;
