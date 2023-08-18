import "./index.sass";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import i18_en from "./i18n/en/global.json";
import i18_es from "./i18n/es/global.json";
import i18_ca from "./i18n/ca/global.json";

if (!localStorage.getItem("lang"))
  localStorage?.setItem(
    "lang",
    (navigator.language || navigator.language)?.substring(0, 2)
  );

const langFromLocalStorage = localStorage.getItem("lang");
const defaultLanguage = langFromLocalStorage || "es";

const i18nOptions = {
  interpolation: { escapeValue: false },
  lng: defaultLanguage,
  resources: {
    en: {
      global: i18_en,
    },
    es: {
      global: i18_es,
    },
    ca: {
      global: i18_ca,
    },
  },
} as const;

i18next.init(i18nOptions);

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18next}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </I18nextProvider>
);
