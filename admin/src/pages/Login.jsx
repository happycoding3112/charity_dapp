import { useNavigate } from "react-router-dom"
import { setGlobalState } from "../store/store"
import { FaTimes } from "react-icons/fa"
import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/login/ngoLogin";

      const { data: res } = await axios.post(url, inputs)

      if (res.success) {
        localStorage.setItem("authToken", res.jwtToken)
        localStorage.setItem("user", JSON.stringify(res.userData))
        toast.success(res.message);
        if (res.userData.role === "admin") navigate("/admin")
        else navigate("/")
        window.location.reload()
      }

    } catch (err) {
      if (err.response && err.response.status == 401) {
        toast.warn(err.response.data.message)
      }
      if (err.response && err.response.status == 400) {
        toast.error(err.response.data.message)
      }
      if (err.response && err.response.status == 405) {
        toast.info(err.response.data.message)
      }
    }
  }

  const onClose = (e) => {
    e.preventDefault();
    setGlobalState("loginModal", "scale-0");
    navigate("/");
  }

  return (
    <div
      className="`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 transform transition-transform duration-300 scale-100"
    >
      <div className="bg-white rounded-xl w-11/12 h-7/12 md:w-2/6 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col mb-4">
          <div className="flex justify-between items-center">
            <p className="font-medium">ADMIN LOGIN</p>
            <button onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-between items-center bg-gray-200 rounded-md mt-5">
            <input
              className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500" type="text"
              name="email"
              onChange={handleChange}
              placeholder="ADMIN Email"
              required
            />
          </div>

          <div className="flex justify-between items-center bg-gray-200 rounded-md mt-5">
            <input
              className="block w-full border-0 bg-transparent p-3 focus:outline-none focus:ring-0 text-sm text-slate-500" type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>

          <button className="mt-5 leading-tight shadow-md uppercase font-semibold text-sm inline-block text-white bg-green-500 hover:bg-green-600 rounded-md px-6 py-2.5">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;
