import { useEffect } from "react";

export default function ModeToggle() {
  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return; // Si html es null, salimos de la función

    const isLightOrAuto =
      localStorage.getItem("hs_theme") === "light" ||
      (localStorage.getItem("hs_theme") === "auto" &&
        !window.matchMedia("(prefers-color-scheme: dark)").matches);
    const isDarkOrAuto =
      localStorage.getItem("hs_theme") === "dark" ||
      (localStorage.getItem("hs_theme") === "auto" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isLightOrAuto && html.classList.contains("dark"))
      html.classList.remove("dark");
    else if (isDarkOrAuto && html.classList.contains("light"))
      html.classList.remove("light");
    else if (isDarkOrAuto && !html.classList.contains("dark"))
      html.classList.add("dark");
    else if (isLightOrAuto && !html.classList.contains("light"))
      html.classList.add("light");
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const handleThemeClick = (theme: string) => {
    localStorage.setItem("hs_theme", theme); // Guardar el tema seleccionado en localStorage

    const html = document.querySelector("html");
    if (!html) return; // Si html es null, salimos de la función

    if (theme === "light") {
      html.classList.remove("dark");
    } else if (theme === "dark") {
      html.classList.add("dark");
    }
  };

  return (
    <>
      <button
        type="button"
        className="hs-dark-mode-active:hidden block hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-neutral-400 dark:hover:text-neutral-500"
        data-hs-theme-click-value="dark"
        onClick={() => handleThemeClick("dark")}
      >
        <svg
          className="flex-shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      </button>
      <button
        type="button"
        className="hs-dark-mode-active:block hidden hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-neutral-400 dark:hover:text-neutral-500"
        data-hs-theme-click-value="light"
        onClick={() => handleThemeClick("light")}
      >
        <svg
          className="flex-shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </button>
    </>
  );
}
