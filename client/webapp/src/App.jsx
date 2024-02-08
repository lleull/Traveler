import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./Component/Sidebar/Sidebar";
import Topbar from "./Component/Tobar/Topbar";
import { useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import SingleUser from "./Pages/SingleUser/Singleuser";
import Loader from "./Component/ui/Loader";
export const backURL = "http://localhost:4000";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const UserAuth = sessionStorage.getItem("userdata");
  console.log(UserAuth);
  useEffect(() => {
    if (UserAuth === null && location.pathname === "register") {
      window.location.replace("/login");
    } else {
      return;
    }
  }, []);

  const Homepage = lazy(() => import("./Pages/Home/Home"));
  const Login = lazy(() => import("./Pages/Login/Login"));
  const Register = lazy(() => import("./Pages/Register/Register"));

  const Profile = lazy(() => import("./Pages/Profile/Profile"));
  return (
    <div className="app">
      {UserAuth === null ? " " : <Topbar />}{" "}
      <div className="wrap">
        {UserAuth === null || location.pathname === "/profile" ? (
          " "
        ) : (
          <Sidebar />
        )}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={UserAuth === null ? <Login /> : <Homepage />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={UserAuth === null ? <Login /> : <Profile />}
            />
            <Route
              path="/single/:username"
              element={UserAuth === null ? <Login /> : <SingleUser />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
