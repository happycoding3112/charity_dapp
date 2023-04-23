import Campaigns from "../components/Campaigns";
import Hero from "../components/Hero";
import CreateCampaign from "../components/CreateCampaign";
import { useEffect } from "react";
import { loadCampaigns } from "../services/blockchain";
import { useGlobalState } from "../store";
import Navbar from "../components/Navbar";

const Home = () => {
  const [campaigns] = useGlobalState("campaigns");
  useEffect(async () => {
    await loadCampaigns();
  }, [])
  return (
    <>
      <Navbar />
      <Hero />
      <Campaigns campaigns={campaigns} />
      <CreateCampaign />
    </>
  );
};

export default Home;
