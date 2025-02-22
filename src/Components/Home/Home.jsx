import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import EditModal from "../EditModal/EditModal";
import displayDateArabic from "../../Methods/displayDateArabic";
export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [operEditModal, setOperEditModal] = useState(false);
  const [id, setId] = useState("");
  const [notes, setNotes] = useState([]);

  const deleteNote = async (id) => {
    try {
      let { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (data.msg === "done") {
        setNotes((oldNotes) => {
          let newNotes = structuredClone(oldNotes);
          newNotes = newNotes.filter((note) => note._id != id);
          return newNotes;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getNotes() {
    try {
      let { data } = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        {
          headers: {
            token: "3b8ny__" + localStorage.getItem("userToken"),
          },
        }
      );
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <div className="container mt-28 dark:text-white">
        <h2 className="text-3xl ">المهام المضافة</h2>
        <div className="bg-slate-100 dark:bg-transparent mt-4 p-4 rounded-lg">
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            type="button"
            className="text-white ms-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            إضافة مهمة
            <i className="fa-solid fa-notes-medical ms-2"></i>
          </button>

          {notes.length ? (
            <div
              className="notes flex gap-4 flex-wrap justify-center mt-6"
              key={0}
            >
              {notes.map((note, index) => (
                <div
                  className="note w-[300px] p-4 bg-slate-300 rounded-lg dark:bg-slate-900"
                  key={index}
                >
                  <div className="icons flex justify-between mb-2 items-center">
                    <span
                      className="edit"
                      onClick={() => {
                        setOperEditModal(true);
                        setId(note._id);
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square text-xl text-main dark:text-mainDark cursor-pointer"></i>
                    </span>
                    <span className="size-[30px] bg-main text-white dark:bg-mainDark rounded-full flex justify-center items-center">
                      {index + 1}
                    </span>
                    <span
                      className="del"
                      onClick={() => {
                        deleteNote(note._id);
                      }}
                    >
                      <i className="fa-solid fa-trash-can text-xl text-red-500 cursor-pointer"></i>
                    </span>
                  </div>

                  <h2 className="text-center text-xl p-2 bg-slate-100 dark:bg-slate-800 rounded-lg mb-2">
                    {note.title}
                  </h2>
                  <p className="mb-2">
                    <i className="fa-solid fa-circle-arrow-right fa-flip-horizontal me-2 text-main "></i>
                    التاريخ : {displayDateArabic(note.createdAt)}
                  </p>
                  <p className="p-2 bg-slate-100 dark:bg-slate-800 ">
                    {" "}
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10">
              <h1 className="text-center text-3xl font-bold">
                لا يوجد مهام تمت إضافتها بعد
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className={openModal ? "block" : "hidden"}>
        <Modal setOpenModal={setOpenModal} setNotes={setNotes} />
      </div>
      <div className={operEditModal ? "block" : "hidden"}>
        <EditModal
          setOpenEditModal={setOperEditModal}
          getNotes={getNotes}
          id={id}
        />
      </div>
    </>
  );
}
