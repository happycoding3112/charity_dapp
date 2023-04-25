import { FaTimes } from "react-icons/fa";
import { setGlobalState } from "../store"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate();

  const [proofDoc, setProofDoc] = useState(null);
  const [annualReportDoc, setAnnualReportDoc] = useState(null);

  const [txtInputs, setTxtInputs] = useState({
    name: "",
    email: "",
    establishedDate: "",
    description: "",
    password: "",
  })

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = "http://localhost:8080/api/upload"
      const res = await axios.post(url, formData);
      return res.data;
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTxtInputs((prev) => (
      { ...prev, [name]: value }
    ))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const proofDocURL = await uploadFile(proofDoc);
      const annualReportDocURL = await uploadFile(annualReportDoc);

      const inputs = {
        ...txtInputs,
        proof: proofDocURL,
        annualReport: annualReportDocURL
      }

      const url = "http://localhost:8080/api/register"

      const { data: res } = await axios.post(url, inputs);

      toast.success(res.message)

      console.log(res.message);

    } catch (err) {
      if (err.response && err.response.status >= 400 && err.response.status <= 500) {
        toast.error(err.response.data)
      }
    }
  }

  const onClose = (e) => {
    e.preventDefault();
    setGlobalState("registerModal", "scale-0");
    navigate("/")
  }

  return (
    <div
      className="`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 transform transition-transform duration-300 scale-100"
    >
      <div className="bg-white rounded-xl w-11/12 h-7/12 md:w-2/6 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col mb-4">
          <div className="flex justify-between items-center">
            <p className="font-medium">Register NGO</p>
            <button onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-between items-center rounded-md mt-5 gap-3">
            <div className="bg-gray-200 w-1/2 rounded-md">
              <input
                className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="NGO Name"
                required
              />
            </div>

            <div className="bg-gray-200 w-1/2 rounded-md">
              <input
                className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="NGO Email"
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-200 rounded-md mt-5 px-4">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-5/12 border-r-2 border-blue-600">
                    <p className="text-slate-500 text-sm">NGO Establishment Date</p></td>
                  <td>
                    <input
                      className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
                      type="date"
                      name="establishedDate"
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center bg-gray-200 rounded-md mt-5 px-4">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-5/12 border-r-2 border-blue-600">
                    <p className="text-slate-500 text-sm">NGO Registration Details</p></td>
                  <td>
                    <input
                      className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
                      type="file"
                      accept="image/*, .pdf"
                      name="proof"
                      onChange={(e) => setProofDoc(e.target.files[0])}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center bg-gray-200 rounded-md mt-5 px-4">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-5/12 border-r-2 border-blue-600">
                    <p className="text-slate-500 text-sm">NGO Annual Report</p></td>
                  <td>
                    <input
                      className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
                      type="file"
                      accept="image/*, .pdf"
                      name="annualReport"
                      onChange={(e) => setAnnualReportDoc(e.target.files[0])}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center bg-gray-200 rounded-md mt-5">
            <textarea
              className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500"
              name="description"
              onChange={handleChange}
              placeholder="Please tell us about the vision of your NGO"
              required
            ></textarea>
          </div>

          <div className="flex justify-between items-center rounded-md mt-5 gap-3">
            <div className="w-1/2 rounded-md bg-gray-200">
              <input
                className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500" type="password"
                name="password"
                onChange={handleChange}
                placeholder="Set Password"
                required
              />
            </div>

            <div className="w-1/2 rounded-md bg-gray-200">
              <input
                className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500" type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>

          <button className="mt-5 leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-green-500 hover:bg-green-600 rounded-md px-6 py-2.5">
            SUBMIT DETAILS
          </button>
        </form>

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-sm">Already Registered?</span>
          <span className="font-semibold text-sm">
            <Link className="hover:text-blue-700 hover:underline" to={"/ngoLogin"}>
              Click Here to go to Login Page
            </Link>
          </span>
        </div>

      </div>
    </div>
  );
}

export default Register