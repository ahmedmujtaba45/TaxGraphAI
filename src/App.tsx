import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ToastProvider } from "@/hooks/useToast";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ToastProvider>
        <BrowserRouter basename={__BASE_PATH__}>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </I18nextProvider>
  );
}

export default App;