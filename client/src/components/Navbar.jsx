import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { connectWallet } from "../services/blockchain";
import { useGlobalState, truncate } from "../store";
import Identicons from "react-identicons"

const Navbar = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [loggedIn, setLoggedIn] = useState(false);
  const [ngo, setNgo] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
    window.location.replace("/")
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"))
      setLoggedIn(true)
      setNgo(user.name)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 shadow-md shadow-gray-700 z-40">
      <div className="flex items-center justify-center bg-gradient-to-r
        from-sky-700 via-sky-400 to-sky-700 h-16 font-bold text-2xl text-white px-8">
        <Link to="/">
          Cause✌️Care
        </Link>
      </div>
      <div className="py-2 flex items-center justify-between bg-gray-800 px-6">
        <div className="flex items-center gap-5 text-gray-300 font-bold ml-2">
          {
            loggedIn ? (
              <Link to="/">
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 hover:text-white rounded-md px-2 py-2">
                  <span className="cursor-pointer hover:bg-gray-700 hover:text-white rounded-md">
                    <Identicons
                      className="rounded-full shadow-md bg-gray-200"
                      string={ngo}
                      size={26}
                    />
                  </span>
                  <span>{ngo}</span>
                </div>
              </Link>
            ) : (
              <span className="cursor-pointer hover:bg-gray-700 hover:text-white rounded-md px-2 py-2">
                <Link to="/viewCamps">
                  All Campaigns
                </Link>
              </span>
            )
          }
        </div>
        <div className="flex items-center gap-5 text-gray-300 font-bold">
          {connectedAccount ? (<button className="inline-block text-white bg-green-600 hover:bg-green-700 rounded-md px-2 py-2 mr-2">
            {truncate(connectedAccount, 4, 4, 11)}
          </button>) : (<button className="inline-block text-white bg-green-600 hover:bg-green-700 rounded-md px-2 py-2 mr-2"
            onClick={connectWallet}>
            Connect Wallet
          </button>)}
          {loggedIn ? (
            <button
              className="hover:bg-gray-700 hover:text-white rounded-md px-2 py-2 mr-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
