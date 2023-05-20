import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../store";
import { deleteCampaign } from "../services/blockchain";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteCampaign = ({ campaign }) => {

  const [deleteModal] = useGlobalState("deleteModal")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await deleteCampaign(campaign?.id)
    console.log("Hello")
    toast.success("Campaign Deleted Successfully, will be reflected in 30 secs!")
    setGlobalState("deleteModal", "scale-0")
    navigate("/")
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 transform transition-transform duration-300 ${deleteModal}`}
    >
      <div className="bg-white rounded-xl w-11/12 h-7/12 md:w-2/5 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Delete Campaign</p>
            <button type="button" onClick={() => setGlobalState("deleteModal", "scale-0")}>
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center mt-5">
            <div className="rounded-xl overflow-hidden h-60 w-60">
              <img
                src={"/clientUploads/" + campaign?.imageURL}
                alt={"/clientUploads/" + campaign?.imageURL}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-center items-center rounded-xl">
            <p className="text-lg">Are you sure you want to delete Campaign</p>
            <small className="text-lg font-semibold text-red-600">This action is irreversible!</small>
          </div>

          <button className="mt-5 leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-red-500 hover:bg-red-600 rounded-md px-6 py-2.5">
            DELETE CAMPAIGN
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteCampaign