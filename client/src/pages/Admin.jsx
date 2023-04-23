import axios from "axios";
import { useEffect, useState } from "react";
import Ngos from "../components/Ngos";

const Admin = () => {
  const [ngos, setNgos] = useState([]);
  const url = "http://localhost:8080/api/admin/getNgos"

  useEffect(async () => {
    const res = await axios.get(url);
    setNgos(res.data);
  }, [])

  return (
    <Ngos ngos={ngos} />
  )
}

export default Admin
