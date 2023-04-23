import { truncate } from "../store/index"
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Ngo = ({ ngo }) => {

  const approveNGO = async (ngoID) => {
    try {
      const url = "http://localhost:8080/api/admin/approveNGO";

      const data = { id: ngoID }

      console.log(data)

      const { data: res, status } = await axios.put(url, data);

      if (status == 500) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
        setTimeout(() => {
          window.location.reload();
        }, 3000)
      }

    } catch (err) {
      console.log(err)
    }

  }

  const rejectNGO = async (ngoID) => {
    try {
      const url = "http://localhost:8080/api/admin/rejectNgo";

      const data = { id: ngoID }

      console.log(data)

      const { data: res, status } = await axios.post(url, data);

      if (status == 500) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
        setTimeout(() => {
          window.location.reload();
        }, 3000)
      }

    } catch (err) {
      console.log(err)
    }
  }

  const isPDF = (fileURL) => {
    const fileExtension = fileURL.substr(fileURL.length - 3)
    if (fileExtension == "pdf") return true;
  }

  return (
    <tr className="border-b border-green-200">
      <td className="text-sm font-medium px-6 py-4 whitespace-nowrap border-2 border-green-200">
        <p>{ngo.name}</p>
      </td>
      <td className="text-sm font-medium px-6 py-4 whitespace-nowrap border-2 border-green-200">
        {
          isPDF(ngo.proof) ?
            (<Link to={"/admin/viewPdf/" + ngo?.proof}><p className="cursor-pointer">{truncate(ngo.proof, 5, 4, 11)}</p></Link>)
            :
            (<Link to={"/admin/viewImage/" + ngo?.proof}><p className="cursor-pointer">{truncate(ngo.proof, 5, 4, 11)}</p></Link>)
        }
      </td>
      <td className="text-sm font-medium px-6 py-4 whitespace-nowrap border-2 border-green-200">
        {
          isPDF(ngo.annualReport) ?
            (<Link to={"/admin/viewPdf/" + ngo?.annualReport}><p className="cursor-pointer">{truncate(ngo.annualReport, 5, 4, 11)}</p></Link>)
            :
            (<Link to={"/admin/viewImage/" + ngo?.annualReport}><p className="cursor-pointer">{truncate(ngo.annualReport, 5, 4, 11)}</p></Link>)
        }
      </td>
      <td className="text-sm text-white font-semibold px-6 py-4 whitespace-nowrap border-2 border-green-200">
        {
          ngo.isVerified === "true" ? (
            <div>
              <p className="text-center text-green-500">Verified</p>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p onClick={() => approveNGO(ngo.id)} className="flex justify-center items-center bg-green-500 h-10 w-10 rounded-full cursor-pointer">Yes</p>
              <p onClick={() => rejectNGO(ngo.id)} className="flex justify-center items-center bg-red-600 h-10 w-10 rounded-full cursor-pointer">No</p>
            </div>
          )
        }
      </td>
    </tr >
  )
}

export default Ngo;
