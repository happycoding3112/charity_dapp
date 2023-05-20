import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import { daysRemaining, setGlobalState, truncate, useGlobalState } from "../store";
import { useEffect, useState } from "react";

const CampaignDetails = ({ campaign }) => {

  const [user, setUser] = useState(false)

  const [connectedAccount] = useGlobalState("connectedAccount")

  const expired = new Date().getTime() > Number(campaign?.deadline + '000')

  useEffect(() => {
    const fetchUser = () => {
      if (localStorage.getItem("authToken")) setUser(true)
    }
    fetchUser()
  }, [user])

  return (
    <div className="flex justify-center pt-36 px-6 mb-5 text-white">
      <div className="flex flex-col justify-center p-5 bg-gray-800 rounded-lg md:w-10/12">
        <div className="flex justify-start items-start flex-wrap space-x-4">
          <div>
            <img
              className="rounded-xl h-64 object-cover w-full"
              src={"/clientUploads/" + campaign?.imageURL}
              alt={"/clientUploads/" + campaign?.imageURL}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col justify-start flex-wrap">
              <h5 className="text-lg font-medium mb-2">
                {campaign?.title}
              </h5>
              <small className="text-gray-200">
                {
                  expired ? "Expired" : daysRemaining(campaign?.deadline) + "left"
                }
              </small>
            </div>

            <div className="flex justify-between items-center w-full pt-2 mb-4">
              <div className="flex items-center justify-start space-x-2">
                <Identicons
                  className="rounded-full shadow-md bg-white"
                  string={campaign?.owner}
                  size={18}
                />
                {
                  campaign?.owner ?
                    (
                      <small>
                        {truncate(campaign?.owner, 4, 4, 11)}
                      </small>
                    ) : null
                }
                <small>{campaign?.donors} Donation{campaign?.donors == 1 ? "" : "s"}</small>
              </div>
              <div className="font-bold">
                {expired ? (
                  <small className="text-red-500">Expired</small>
                ) : campaign?.status == 0 ? (
                  <small className="text-green-500">Open</small>
                ) : campaign?.status == 1 ? (
                  <small className="text-green-500">Accepted</small>
                ) : campaign?.status == 2 ? (
                  <small className="text-gray-500">Reverted</small>
                ) : campaign?.status == 3 ? (
                  <small className="text-red-500">Deleted</small>
                ) : (
                  <small className="text-orange-500">Completed</small>
                )}
              </div>
            </div>

            <p className="text-sm font-light">
              {campaign?.description}
            </p>

            <div className="w-full bg-gray-300 mt-4">
              <div
                className="bg-green-600 max-w-full overflow-hidden text-xs font-medium text-green-100 text-center p-0.5 rounded-l-full leading-none"
                style={{ width: `${(campaign?.raised / campaign?.cost) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center font-bold mt-3">
              <small>{campaign?.raised} ETH Raised of</small>
              <small className="flex items-center justify-start">
                <FaEthereum />
                <span>{campaign?.cost} ETH</span>
              </small>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-6 mb-2 space-x-2">
          {!(user) && campaign?.status == 0 && !expired &&
            (
              <button className="leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-green-500 hover:bg-green-600 rounded-md px-6 py-2.5"
                onClick={() => setGlobalState("fundModal", "scale-100")}>
                donate
              </button>
            )
          }

          {(user && campaign?.owner == connectedAccount) && (
            campaign?.status != 3 ? (
              campaign?.status == 1 ?
                (
                  <button className="leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-orange-500 hover:bg-orange-600 rounded-md px-6 py-2.5">
                    payout
                  </button>
                ) : campaign?.status != 4 && !expired ? (
                  <>
                    <button
                      className="leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-gray-500 
                    hover:bg-gray-600 rounded-md px-6 py-2.5"
                      onClick={() => setGlobalState("updateModal", "scale-100")}
                    >
                      edit
                    </button>
                    <button
                      className="leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-red-500 hover:bg-red-600 rounded-md px-6 py-2.5"
                      onClick={() => setGlobalState("deleteModal", "scale-100")}
                    >
                      delete
                    </button>
                  </>
                ) : null
            ) : (
              <button className="leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-gray-600 hover:bg-gray-700 rounded-md px-6 py-2.5">
                Campaign Closed
              </button>
            )
          )}

          {(!user && (expired || campaign?.status == 3)) && (
            <button className="leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-gray-600 hover:bg-gray-700 rounded-md px-6 py-2.5">
              Campaign Closed
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default CampaignDetails;
