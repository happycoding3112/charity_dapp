/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchUser = () => {
      if (localStorage.getItem("authToken")) {
        const userData = localStorage.getItem("user");
        setCurrentUser(userData);
      } else {
        setCurrentUser(null)
      }
    }
    fetchUser();
  }, [])

  if (currentUser === undefined) return null

  if (!currentUser) return <Navigate to="/" />

  return children
}

export default Auth