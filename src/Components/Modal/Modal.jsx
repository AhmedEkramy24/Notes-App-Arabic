import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function Modal({ setOpenModal,  setNotes }) {
  const [textCount, setTextCount] = useState("0");
  const [isSubmit, setIsSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("اضف عنوان المهمة فيما لا يزيد عن 50 حرف")
      .max(50, "عنوان كبير جدا"),
    content: Yup.string()
      .required("اضف محتوى المهمة فيما لا يزيد عن 300 حرف")
      .max(300, "محتوى المهمة كبير جدا اقصى حد 300 حرف"),
  });
  const addNote = async (values) => {
    setIsSubmit(true);
    try {
      const { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        values,
        {
          headers: {
            token: "3b8ny__" + localStorage.getItem("userToken"),
          },
        }
      );
      if (data.msg === "done") {
        setNotes((oldNotes) => [...oldNotes, data.note]);
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(values);
    setIsSubmit(false);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema,
    onSubmit: addNote,
  });

  return (
    <>
      <div className="fixed top-0 start-0 end-0 bottom-0 dark:text-white bg-black bg-opacity-30 flex justify-center items-center p-2">
        <form
          className="md:w-1/2 w-full mx-auto bg-white p-6 rounded-lg dark:bg-slate-800"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-center">إضافة المهمة</h1>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              عنوان المهمة
            </label>
            <input
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.errors.title && formik.touched.title && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.title}
              </div>
            )}
          </div>

          <div className="mb-5 relative">
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              محتوى المهمة
            </label>
            <textarea
              type="text"
              id="content"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formik.values.content}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyDown={(e) => {
                setTextCount(e.target.value.length);
              }}
            />
            <p className="ms-auto w-fit">{textCount}/300</p>
            {formik.errors.content && formik.touched.content && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.content}
              </div>
            )}
          </div>
          {isSubmit ? (
            <button
              type="button"
              className="text-white bg-main  focus:ring-4 focus:outline-none focus:blue-orange-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              جاري الإرسال
              <i className="fas fa-spinner fa-spin ms-2 text-lg"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-main  focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              إضافة المهمة
            </button>
          )}
          <button
            type="button"
            className="text-red-500 font-bold ms-4"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            إغلاق
          </button>
        </form>
      </div>
    </>
  );
}
