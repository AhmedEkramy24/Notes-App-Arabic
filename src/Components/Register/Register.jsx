import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const [apiError, setApiError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("الاسم مطلوب")
      .min(3, "اسم قصير جداٌ")
      .max(20, "اسم طويل جداٌ"),
    email: Yup.string()
      .required("البريد الإلكتروني مطلوب")
      .email("  بريد إلكتروني غير صحيح"),
    password: Yup.string()
      .required("الرمز مطلوب")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        " يجب ان يحتوي الرمز على حروف و أرقام"
      )
      .min(8, "يجب ان يكون الرمز لا يقل عن 8 رموز"),
    age: Yup.string()
      .required("السن مطلوب")
      .matches(/^0?[1-9][0-9]?$/, "سن غير صحيح"),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(/^01[0-25][0-9]{8}$/, "رقم غير صحيح"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit: signUp,
    validationSchema,
  });

  async function signUp(values) {
    setIsSubmit(true);

    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signUp",
        values
      );
      setIsSubmit(false);
      setApiError("");
      navigate("/login");
    } catch (error) {
      setIsSubmit(false);
      setApiError(error.response.data.msg);
    }
  }
  return (
    <>
      <div className="container mt-28 p-2">
        <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
          {apiError && (
            <div
              className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
              role="alert"
            >
              {apiError === "email is already exist" &&
                "هذا الحساب موجود بالفعل"}
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              الاسم
            </label>
            <input
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {formik.errors.name && formik.touched.name && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.name}
              </div>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              البريد الإلكتروني
            </label>
            <input
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {formik.errors.email && formik.touched.email && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-5 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              رمز المرور
            </label>
            <input
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={hidePass ? "password" : "text"}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <span
              className="cursor-pointer dark:text-white"
              onClick={() => {
                setHidePass(hidePass ? false : true);
              }}
            >
              {hidePass ? (
                <i className="fas fa-eye-slash absolute top-10 end-2 "></i>
              ) : (
                <i className="fas fa-eye absolute top-10 end-2"></i>
              )}
            </span>
            {formik.errors.password && formik.touched.password && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              السن
            </label>
            <input
              value={formik.values.age}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              id="age"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {formik.errors.age && formik.touched.age && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.age}
              </div>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              رقم الهاتف
            </label>
            <input
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {formik.errors.phone && formik.touched.phone && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            )}
          </div>

          {isSubmit ? (
            <button
              type="button"
              className="text-white bg-main  focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              جاري الإرسال
              <i className="fas fa-spinner fa-spin ms-2 text-lg"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-main  focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              تسجيل الدخول
            </button>
          )}
        </form>
      </div>
    </>
  );
}
