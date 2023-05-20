import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../store";
import { useState } from "react";
import { updateCampaign } from "../services/blockchain";
import { toast } from "react-toastify";
import axios from "axios"

const EditCampaign = ({ campaign }) => {
  const [updateModal] = useGlobalState("updateModal");
  const [title, setTitle] = useState(campaign?.title);
  const [description, setDescription] = useState(campaign?.description);
  const [date, setDate] = useState(new Date(campaign?.deadline));
  const [image, setImage] = useState(campaign?.imageURL);

  const toTimeStamp = (date) => {
    const dateObj = Date.parse(date);
    return dateObj / 1000;
  };

  const uploadFile = async (file) => {
    try {
      const formdata = new FormData()
      formdata.append("file", file)
      const url = "http://localhost:8080/api/upload/campaignImage"
      const res = await axios.post(url, formdata)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !image || !date) {
      return toast.error("Please update all the fields!")
    }

    const imageURL = await uploadFile(image)

    const userInput = {
      id: campaign?.id,
      title,
      description,
      deadline: toTimeStamp(date),
    }

    await updateCampaign({ ...userInput, imageURL });
    toast.success("Campaign updated successfully, will reflect within 30 secs!");
    setGlobalState("updateModal", "scale-0");
  }

  const onClose = () => {
    setGlobalState("updateModal", "scale-0");
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 transform transition-transform duration-300 z-50 ${updateModal}`}
    >
      <div className="bg-white rounded-md w-11/12 h-7/12 md:w-2/5 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Edit Campaign</p>
            <button type="button" onClick={onClose}>
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

          <div className="mt-5 bg-gray-200 flex justify-between items-center rounded-md">
            <input
              className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
              type="text"
              placeholder="Title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div className="mt-5 bg-gray-200 flex justify-between items-center rounded-md">
            <input
              className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
              type="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              placeholder="Deadline"
              required
            />
          </div>

          <div className="flex justify-between items-center bg-gray-200 rounded-md mt-5 px-4">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-5/12 border-r-2 border-blue-600">
                    <p className="text-slate-500 text-sm">Image for your Campaign</p></td>
                  <td>
                    <input
                      className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={(e) => {
                        setImage(e.target.files[0])
                      }}
                      placeholder="Image Supporting your Cause"
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 bg-gray-200 flex justify-between items-center rounded-md">
            <textarea
              className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description"
              required
            ></textarea>
          </div>

          <button className="mt-5 leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-green-500 hover:bg-green-600 rounded-md px-6 py-2.5">
            UPDATE CAMPAIGN DETAILS
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCampaign;
