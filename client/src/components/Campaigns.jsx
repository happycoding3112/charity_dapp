import Card from "./Card";

const Campaigns = ({ campaigns }) => {
  return (
    <div className="px-6 flex flex-col text-white pb-5">
      <h1 className="mb-14 text-center text-2xl font-semibold">
        Donate to NGOs from the list of Campaigns shown below
      </h1>
      <div className="flex flex-wrap justify-center items-center">
        {campaigns
          .map((campaign, i) => (
            <Card key={i} campaign={campaign} />
          ))}
      </div>
      <div className="flex justify-center items-center pb-8 font-bold">
        <button className="capitalize inline-block text-white bg-green-600 hover:bg-green-700 rounded-md px-2 py-2 mt-6">
          Load More
        </button>
      </div>
    </div>
  );
};

export default Campaigns;
