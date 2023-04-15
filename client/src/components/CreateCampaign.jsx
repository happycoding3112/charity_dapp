import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../store";
import { useState } from "react";
import { createCampaign } from "../services/blockchain";
import { toast } from "react-toastify";

const CreateCampaign = () => {
  const [createModal] = useGlobalState("createModal");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [imageURL, setImageURL] = useState("");

  const toTimeStamp = (date) => {
    const dateObj = Date.parse(date);
    return dateObj / 1000;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInput = {
      title,
      description,
      imageURL,
      cost,
      deadline: toTimeStamp(date),
    }

    await createCampaign(userInput);
    toast.success("Campaign created successfully, will reflect within 30 secs!");
    onClose();
  }

  const onClose = () => {
    setGlobalState("createModal", "scale-0");
    setTitle("");
    setDescription("");
    setImageURL("");
    setDate("");
    setCost("");
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 transform transition-transform duration-300 ${createModal}`}
    >
      <div className="bg-white rounded-xl w-11/12 h-7/12 md:w-2/5 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Create Campaign</p>
            <button type="button" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center mt-5">
            <div className="rounded-md overflow-hidden h-52 w-full object-cover">
              <img
                src={imageURL || "https://burrelles.com/wp-content/uploads/2022/12/GivingInaToughEconomy-mainV.jpg"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-5 bg-gray-200 flex justify-between items-center rounded-xl">
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

          <div className="mt-5 bg-gray-200 flex justify-between items-center rounded-xl">
            <input
              className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
              type="number"
              placeholder="Amount (ETH)"
              min={0.01}
              step={0.01}
              name="amount"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              required
            />
          </div>

          <div className="mt-5 bg-gray-200 flex justify-between items-center rounded-xl">
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

          <div className="mt-5 bg-gray-200 flex justify-between items-center rounded-xl">
            <input
              className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
              type="text"
              name="imageURL"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              placeholder="Image Supporting your Cause"
              required
            />
          </div>

          <div className="mt-5 bg-gray-200 flex justify-between items-center rounded-xl">
            <textarea
              className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description"
              required
            ></textarea>
          </div>

          <button className="mt-5 leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-green-500 hover:bg-green-600 rounded-md px-6 py-2.5">
            PUBLISH CAMPAIGN
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
