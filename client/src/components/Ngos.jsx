import Ngo from "./Ngo"

const Ngos = ({ ngos }) => {

  return (
    <div className="bg-white flex justify-center h-screen mt-6">
      <div className="border-2 border-blue-400 h-5/6 md:w-3/4 rounded-md shadow-slate-900 shadow-lg p-2 overflow-y-scroll">
        <table className="min-w-full overflow-y-scroll">
          <thead className="border-b border-green-200">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left border-2 border-green-200"
              >
                NGO Name
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left border-2 border-green-200"
              >
                NGO Registration Details
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left border-2 border-green-200"
              >
                Annual Report
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left border-2 border-green-200"
              >
                Approve NGO
              </th>
            </tr>
          </thead>
          <tbody>
            {ngos?.map((ngo, id) => (
              <Ngo key={id} ngo={ngo} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Ngos