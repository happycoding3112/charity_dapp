import { Link } from "react-router-dom";
import Identicons from "react-identicons";
import { daysRemaining, truncate } from "../store";
import { FaEthereum } from "react-icons/fa";

const Card = ({ campaign }) => {
  return (
    <div id="campaigns" className="flex bg-white rounded-lg hover:shadow-lg hover:shadow-green-300 w-64 m-4">
      <Link to={"/campaigns/" + campaign?.id}>
        <img
          className="rounded-lg h-64 w-full object-cover"
          src={campaign?.imageURL}
          alt="project_title"
        />
        <div className="p-4 text-gray-700">
          <h1 className="mb-2">{campaign?.title}</h1>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <Identicons
                className="rounded-full shadow-md"
                string={campaign?.owner}
                size={18}
              />
              <small>{truncate(campaign?.owner, 4, 4, 11)}</small>
            </div>
            <small className="text-gray-500 mb-2">{new Date().getTime() > Number(campaign.deadline + "000") ? "Expired" : daysRemaining(campaign.deadline)}{" "} left</small>
          </div>
          <div className="w-full bg-gray-300">
            <div
              className="bg-green-600 max-w-full overflow-hidden text-xs font-medium text-green-100 text-center p-0.5 rounded-l-full leading-none"
              style={{ width: `${(campaign.raised / campaign.cost) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center font-bold mt-2">
            <small>{campaign.raised} ETH raised of</small>
            <small className="flex justify-start items-center">
              <FaEthereum />
              <span>{campaign.cost} ETH</span>
            </small>
          </div>

          <div className="flex justify-between items-center flex-wrap text-gray-500 font-bold mt-4">
            <small>{campaign.donors} Donation{campaign.donors == 1 ? "" : "s"}</small>
            <small className="text-green-500">Open</small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
