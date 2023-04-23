import Ngo from "./Ngo"

const Ngos = ({ ngos }) => {

  return (
    <div className="fixed top-0 left-0 bg-white h-screen w-screen flex justify-center items-center py-8 overflow-y-scroll">
      <div className="border-2 border-blue-400 min-h-full md:w-3/4 rounded-md shadow-slate-900 shadow-lg p-2 overflow-y-scroll">
        <table className="min-w-full max-h-96px overflow-y-scroll">
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