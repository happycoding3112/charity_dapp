import React from "react";
import { Routes, Route } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import { useEffect, useState } from "react";
import { isWalletConnected } from "./services/blockchain";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ViewFile from "./components/ViewFile";
import ViewImg from "./components/ViewImg";

const App = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(async () => {
    await isWalletConnected();
    setLoaded(true);
  }, [])
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="min-h-screen relative bg-gray-900">
        {loaded ? (<Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns/:id" element={<Campaign />} />
          <Route path="/registerNGO" element={<Register />} />
          <Route path="/ngoLogin" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/viewPdf/:doc" element={<ViewFile />} />
          <Route path="/admin/viewImage/:img" element={<ViewImg />} />
        </Routes>) : null}
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
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
    </Worker>
  );
};

export default App;
