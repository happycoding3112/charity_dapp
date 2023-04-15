import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import { truncate } from "../store";
import Moment from "react-moment";

const Donor = ({ donor }) => {
  return (
    <tr className="border-b border-green-200">
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2 justify-start">
          <Identicons
            className="h-10 w-10 rounded-full shadow-md object-contain bg-white"
            string={donor?.owner}
            size={25}
          />
          <span>{truncate(donor.owner, 4, 4, 11)}</span>
        </div>
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <span className="flex justify-start items-center space-x-1 text-md">
          <FaEthereum />
          <span>{donor.donationAmount} ETH</span>
        </span>
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <Moment fromNow>{donor.timestamp}</Moment>
      </td>
    </tr>
  )
}

export default Donor