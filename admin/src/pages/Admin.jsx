import { useEffect, useState } from "react"
import axios from "axios"
import Ngos from "../components/Ngos"


const Admin = () => {
  const [ngos, setNgos] = useState([])
  const url = "http://localhost:8080/api/admin/getNgos"

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
    window.location.reload()
  }

  useEffect(() => {
    const fetchNgos = async () => {
      const res = await axios.get(url);
      setNgos(res.data)
    }
    fetchNgos();
  })

  return (
    <div className="h-screen relative flex">
      <div className="top-0 left-0 w-full fixed p-4 flex justify-between items-center bg-blue-900 text-white font-semibold z-10">
        <span>ADMIN</span>
        <button
          className="rounded-md bg-blue-600 hover:bg-blue-500 p-2"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>
      <Ngos ngos={ngos} />
    </div>
  )
}

export default Admin