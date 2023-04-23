import { Link } from "react-router-dom";
import { setGlobalState, useGlobalState } from "../store";

const Hero = () => {
  const [stats] = useGlobalState("stats");

  return (
    <div className="text-center text-white pt-36 pb-20 mt-6 px-8">
      <h1 className="text-4xl tracking-tight font-bold mb-6">
        Help NGOs to give support to millions of lives!
      </h1>
      <h1 className="text-4xl tracking-tight font-bold mb-6">
        If you are an NGO you can{" "}
        <Link to="/registerNGO">
          <span className="text-blue-600 hover:text-green-400 underline cursor-pointer">
            Register
          </span>
        </Link>{" "}
        or{" "}
        <Link to="/ngoLogin">
          <span className="text-blue-600 hover:text-green-400 underline cursor-pointer">
            Login
          </span>
        </Link>{" "}
        to create and raise funds for your own campaign.
      </h1>

      <button
        className="my-4 font-bold inline-block text-white bg-green-600 hover:bg-green-700 rounded-md px-2 py-2 mr-2"
        onClick={() => setGlobalState("createModal", "scale-100")}
      >
        CREATE CAMPAIGN
      </button>

      <div className="flex mt-10 justify-center items-center">
        <div className="flex flex-col justify-center items-center border w-full h-20 shadow-md">
          <span className="text-xl font-bold text-blue-600 leading-8">{stats?.totalCampaigns || 0}</span>
          <span>Campaigns</span>
        </div>
        <div className="flex flex-col justify-center items-center border w-full h-20 shadow-md">
          <span className="text-xl font-bold text-blue-600 leading-8">{stats?.totalDonors || 0}</span>
          <span>Donors</span>
        </div>
        <div className="flex flex-col justify-center items-center border w-full h-20 shadow-md">
          <span className="text-xl font-bold text-blue-600 leading-8">{stats?.totalDonations || 0}</span>
          <span>Raised</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
