import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom"

const ViewImg = () => {

  const { img } = useParams();
  const navigate = useNavigate();

  const onClose = () => {
    navigate("/admin")
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-white flex justify-center items-center p-4">
      <div className="bg-gray-200 rounded-md h-full w-3/5">
        <div className="flex justify-between items-center p-4 w-full">
          <p>View Uploaded Image</p>
          <FaTimes className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="px-2 overflow-y-scroll" style={{ height: "90%" }}>
          <img src={"/uploads/" + img} alt="" />
        </div>
      </div>
    </div>
  )
}

export default ViewImg;
