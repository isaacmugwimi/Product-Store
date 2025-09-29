import "./css/App.css";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

// import toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      {/* Toast container at the root of the app */}
      <ToastContainer
        position="bottom-right" // where it shows
        autoClose={3000} // disappears after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // options: "light", "dark", "colored"
      />
    </div>
  );
}

export default App;
