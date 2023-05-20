import React from "react";
import { Routes, Route } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
import { useEffect, useState } from "react";
import { isWalletConnected } from "./services/blockchain";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar"
import NgoHome from "./pages/NgoHome";
import ViewCampaigs from "./pages/ViewCampaigs";

const App = () => {
  const [loaded, setLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const walletConnection = async () => {
      await isWalletConnected();
      setLoaded(true);
    }

    if (localStorage.getItem("authToken")) setLoggedIn(true)
    walletConnection()
  }, [])

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="min-h-screen relative bg-gray-900">
        <Navbar />
        {loaded ? (
          <Routes>
            {
              loggedIn
                ?
                (
                  <Route path="/" element={
                    <NgoHome />
                  }
                  />
                )
                :
                (
                  <Route path="/" element={
                    <Home />
                  }
                  />
                )}
            <Route path="/campaigns/:id" element={<Campaign />} />
            <Route path="/registerNGO" element={<Register />} />
            <Route path="/ngoLogin" element={<Login />} />
            <Route path="/viewCamps" element={<ViewCampaigs />} />
          </Routes>
        ) : null}
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
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
