import { useEffect, useState } from "react";
import Campaigns from "../components/Campaigns"
import { useGlobalState } from "../store";
import { loadCampaigns } from "../services/blockchain";
import { useNavigate } from "react-router-dom";

const ViewCampaigs = () => {

  const [stats] = useGlobalState("stats");
  const [campaigns] = useGlobalState("campaigns");
  const [err, setErr] = useState();

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        await loadCampaigns()
      } catch (err) {
        setErr(err)
      }
    }
    if (localStorage.getItem("authToken")) {
      navigate("/")
    }
    fetchCampaigns()
  }, [])

  return (
    <>
      <div className="flex pt-44 mb-10 justify-center items-center text-white px-8">
        <div className="flex flex-col justify-center items-center border w-full h-20 shadow-md">
          <span className="text-2xl font-bold text-red-500 leading-8">{stats?.totalCampaigns || 0}</span>
          <span>Campaigns</span>
        </div>
        <div className="flex flex-col justify-center items-center border w-full h-20 shadow-md">
          <span className="text-2xl font-bold text-red-500 leading-8">{stats?.totalDonors || 0}</span>
          <span>Donors</span>
        </div>
        <div className="flex flex-col justify-center items-center border w-full h-20 shadow-md">
          <span className="text-2xl font-bold text-red-500 leading-8">{stats?.totalDonations || 0}</span>
          <span>Raised</span>
        </div>
      </div>
      <Campaigns campaigns={campaigns} />
    </>
  )
}

export default ViewCampaigs