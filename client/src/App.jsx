import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import { useEffect, useState } from "react";
import { isWalletConnected } from "./services/blockchain";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(async () => {
    await isWalletConnected();
    setLoaded(true);
  }, [])
  return (
    <div className="min-h-screen relative bg-gray-900">
      <Navbar />
      {loaded ? (<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns/:id" element={<Campaign />} />
      </Routes>) : null}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
