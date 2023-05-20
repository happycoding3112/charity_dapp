import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
import { useState } from "react";
import { fundCampaign } from "../services/blockchain";
import { toast } from "react-toastify";

const FundCampaign = ({ campaign }) => {
  const [fundModal] = useGlobalState("fundModal");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount) return;
    await fundCampaign(campaign?.id, amount);
    toast.success("Your donation is being transferred!")
    setGlobalState("fundModal", "scale-0")
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 transform transition-transform duration-300 ${fundModal}`}
    >
      <div className="bg-white rounded-xl w-11/12 h-7/12 md:w-2/5 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{campaign?.title}</p>
            <button type="button" onClick={() => setGlobalState("fundModal", "scale-0")}>
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

          <div className="mt-5 bg-gray-200 flex justify-between items-center rounded-xl">
            <input
              className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
              type="number"
              placeholder="Amount (ETH)"
              min={0.01}
              step={0.01}
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <button className="mt-5 leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-green-500 hover:bg-green-600 rounded-md px-6 py-2.5">
            CONFIRM DONATION
          </button>
        </form>
      </div>
    </div>
  );
}

export default FundCampaign