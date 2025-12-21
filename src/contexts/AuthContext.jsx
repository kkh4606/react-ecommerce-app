import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContexProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let getUser = async (token) => {
    try {
      let res = await axios.get("http://localhost:9000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        if (res.data[0]?.errors.message === "Unauthenticated.") {
          console.log("not log in");
        } else {
          setUser(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  let userLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, getUser, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContexProvider };
