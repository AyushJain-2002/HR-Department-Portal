import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.jsx";
import { AppWrapper } from "./components/common/PageMeta";
import { ThemeProvider } from "./context/ThemeContext";
import {Provider} from 'react-redux';
import {store} from './store/store.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById("root")).render(
  // <StrictMode>
   <Provider store={store}>
    <ThemeProvider>
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <AppWrapper>
        <App />
      </AppWrapper>
      </BrowserRouter>
    </ThemeProvider>
     </Provider>
  // </StrictMode>,
);
