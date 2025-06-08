import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./routes";
import AppRouterAdmin from "./routes/AppRouterAdmin";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/admin/*" element={<AppRouterAdmin />} />
        <Route path="/*" element={<AppRouter />} />
      </Routes>
    </div>
  );
}

export default App;
