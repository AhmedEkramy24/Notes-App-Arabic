import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { userContext } from "../../Context/UserContext";

const MySwal = withReactContent(Swal);

export default function Login() {
  const [apiError, setApiError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const { setUserToken } = useContext(userContext);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("البريد الإلكتروني مطلوب")
      .email("  بريد إلكتروني غير صحيح"),
    password: Yup.string()
      .required("الرمز مطلوب")
      .min(8, "يجب ان يكون الرمز لا يقل عن 8 رموز"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: signIn,
    validationSchema,
  });

  async function signIn(values) {
    setIsSubmit(true);

    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        values
      );
      setIsSubmit(false);
      setApiError("");
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
      MySwal.fire({
        title: "تم التسجيل بنجاح",
        icon: "success",
        confirmButtonText: "تم",
      });
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
              className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 tracking-widest"
              role="alert"
            >
              بريد إلكتروني خاطئ أو رمز خاطئ
            </div>
          )}

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
                <i className="fas fa-eye-slash absolute top-10 end-2"></i>
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
