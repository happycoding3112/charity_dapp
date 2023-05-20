import Campaigns from "../components/Campaigns";
import CreateCampaign from "../components/CreateCampaign";
import { useEffect, useState } from "react";
import { loadCampaigns } from "../services/blockchain";
import { setGlobalState, useGlobalState } from "../store";
import NgoHero from "../components/NgoHero";

const NgoHome = () => {
  const [campaigns] = useGlobalState("campaigns");
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [userCampaigns] = useGlobalState("userCampaigns")
  const [err, setErr] = useState();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        await loadCampaigns()
        const res = campaigns.filter((campaign) => campaign.owner == connectedAccount)
        setGlobalState("userCampaigns", res)
      } catch (err) {
        setErr(err)
      }
    }
    fetchCampaigns()
  }, [userCampaigns])

  return (
    <>
      <NgoHero />
      <Campaigns campaigns={userCampaigns} />
      <CreateCampaign />
    </>
  );
};

export default NgoHome;
