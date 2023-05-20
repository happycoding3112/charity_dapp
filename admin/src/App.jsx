import Admin from "./pages/Admin"
import { ToastContainer } from "react-toastify"
import { Worker } from "@react-pdf-viewer/core"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Auth from "./Auth"
import ViewFile from "./components/ViewFile"
import ViewImg from "./components/ViewImg"

function App() {

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin"
          element={
            <Auth>
              <Admin />
            </Auth>
          }
        />
        <Route path="/admin/viewPdf/:doc" element={<ViewFile />} />
        <Route path="/admin/viewImg/:img" element={<ViewImg />} />
      </Routes>
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
    </Worker>
  )
}

export default App
