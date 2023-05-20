import { Link } from "react-router-dom";

const Hero = () => {

  return (
    <div className="text-center text-white pt-36 pb-14 mt-6 px-8">
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
    </div>
  );
};

export default Hero;
