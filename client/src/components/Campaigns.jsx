import { useEffect, useState } from "react";
import Card from "./Card";
import { FaSearch } from "react-icons/fa";
import Fuse from "fuse.js"

const Campaigns = ({ campaigns }) => {

  const [user, setUser] = useState(false);

  const [queryRes, setQueryRes] = useState([])

  const options = {
    keys: ['title']
  }

  const fuse = new Fuse(campaigns, options)

  const handleChange = async (e) => {
    const inputs = e.target.value
    const results = fuse.search(inputs, options)
    setQueryRes(results)
  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = localStorage.getItem("authToken")
      if (res) setUser(true)
    }
    fetchUser()
  }, [user])

  return (
    <div className="px-6 flex flex-col text-white pb-5">
      {user ? (
        <>
          <h1 className="mb-10 text-center text-2xl font-semibold">
            Your Campaigns!
          </h1>
        </>
      ) : (
        <>
          <h1 className="mb-10 text-center text-2xl font-semibold">
            Donate to NGOs from the list of Campaigns shown below!
          </h1>
        </>
      )
      }

      <div className="flex justify-center items-center mb-8">
        <div className="w-2/5 flex items-center bg-white gap-2 text-black px-2 font-medium rounded-md">
          <FaSearch />
          <input
            type="search"
            className="w-full outline-none border-none focus:border-none focus:outline-none focus:ring-0"
            placeholder="Search for Campaigns"
            name="searchQuery"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-wrap px-40 justify-center items-center">
        {
          (queryRes?.length > 0) ?
            (
              queryRes
                .map((campaign, i) => (
                  <Card key={i} campaign={campaign?.item} title={campaign.item.title} />
                ))
            )
            :
            (
              campaigns?.map((campaign, i) => (
                <Card key={i} campaign={campaign} title={campaign?.title} />
              ))
            )
        }
      </div>
    </div >
  );
};

export default Campaigns;
