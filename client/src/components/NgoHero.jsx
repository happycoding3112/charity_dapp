import { Link } from "react-router-dom";
import { setGlobalState, useGlobalState } from "../store";

const NgoHero = () => {

  return (
    <div className="text-center text-white pt-36 pb-4 mt-6 px-8">
      <div className="bg-gradient-to-r from-sky-400 via-sky-700 to-sky-400 rounded-md py-8 text-white">
        <h1 className="text-4xl tracking-tight font-bold mb-6">
          Let's build a better world one step at a time!
        </h1>
        <p className="text-3xl tracking-tight font-bold mb-6">
          Easily create and manage your Campaigns!
        </p>
        <p className="text-3xl tracking-tight font-bold mb-2">
          Track all the campaigns easily in real time!
        </p>
      </div>

      <button
        className="my-4 font-bold inline-block text-white bg-green-600 hover:bg-green-700 rounded-md px-2 py-2 mt-12"
        onClick={() => setGlobalState("createModal", "scale-100")}
      >
        CREATE CAMPAIGN
      </button>

    </div>
  );
};

export default NgoHero;
