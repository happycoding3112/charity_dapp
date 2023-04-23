import { useEffect } from "react";
import CampaignDetails from "../components/CampaignDetails";
import Donors from "../components/Donors";
import FundCampaign from "../components/FundCampaign";
import { getDonors, loadCampaign } from "../services/blockchain";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../store";
import Navbar from "../components/Navbar";

const Campaign = () => {
  const { id } = useParams();
  const [campaign] = useGlobalState("campaign")
  const [donors] = useGlobalState("donors");

  useEffect(async () => {
    await loadCampaign(id);
    await getDonors(id);
  }, [])

  console.log(donors)

  return (
    <>
      <Navbar />
      <CampaignDetails campaign={campaign} />
      <FundCampaign campaign={campaign} />
      <Donors donors={donors} />
    </>
  );
};

export default Campaign;
