import Donor from "./Donor";

const Donors = ({ donors }) => {
  return (
    <div className="flex flex-col text-white justify-center items-start md:w-10/12 px-5 mt-12 mx-auto">
      <div className="max-h-[calc(100vh_-_25rem)] overflow-y-auto shadow-md shadow-green-200 rounded-md w-full mb-12">
        <table className="min-w-full">
          <thead className="border-b border-green-200">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Donator
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Donated Amount
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {donors?.map((donor, id) => (
              <Donor key={id} donor={donor} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donors;
