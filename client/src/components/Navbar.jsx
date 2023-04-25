import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { connectWallet, isWalletConnected } from "../services/blockchain";
import { useGlobalState, truncate } from "../store";

const Navbar = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) setLoggedIn(true)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 shadow-md shadow-gray-700">
      <div className="flex items-center justify-between bg-blue-900 h-16 font-bold text-2xl text-white px-8">
        <Link to="/">Cause✌️Care</Link>
        <div className="flex items-center gap-2 py-1 w-120 bg-white rounded-md border-none">
          <FaSearch className="text-black text-lg mx-4" />
          <input
            className="text-black font-normal text-lg h-8 w-80 outline-none border-none bg-transparent 
            focus:border-none focus:outline-none focus:ring-0"
            type="text"
          />
        </div>
      </div>
      <div className="py-2 flex items-center justify-between bg-gray-800 px-6">
        <div className="flex items-center gap-5 text-gray-300 font-bold ml-2">
          {loggedIn ? (
            <span className="cursor-pointer hover:bg-gray-700 hover:text-white rounded-md px-2 py-2">
              Your Campaigns
            </span>
          ) : (
            <span className="cursor-pointer hover:bg-gray-700 hover:text-white rounded-md px-2 py-2">
              All Campaigns
            </span>
          )}
        </div>
        <div className="flex items-center gap-5 text-gray-300 font-bold">
          {connectedAccount ? (<button className="inline-block text-white bg-green-600 hover:bg-green-700 rounded-md px-2 py-2 mr-2">
            {truncate(connectedAccount, 4, 4, 11)}
          </button>) : (<button className="inline-block text-white bg-green-600 hover:bg-green-700 rounded-md px-2 py-2 mr-2"
            onClick={connectWallet}>
            Connect Wallet
          </button>)}
          {loggedIn ? (
            <button className="hover:bg-gray-700 hover:text-white rounded-md px-2 py-2 mr-2">
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
