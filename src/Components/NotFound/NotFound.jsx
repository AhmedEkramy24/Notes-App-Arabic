import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <>
      <section class="bg-white dark:bg-gray-900 mt-28">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-main dark:text-mainDark">
              404
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              هناك شيء مفقود.
            </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              عذرًا، لا يمكننا العثور على تلك الصفحة. ستجد الكثير لاستكشافه على
              الصفحة الرئيسية.
            </p>
            <p class="inline-flex text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
              <Link to={"/home"}>العودة إلى الصفحة الرئيسية</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
