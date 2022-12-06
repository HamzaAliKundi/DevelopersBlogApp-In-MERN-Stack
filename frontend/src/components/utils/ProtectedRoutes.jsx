import { Outlet } from "react-router-dom";
import Home from "../Home";

const useAuth = () => {
   const user = { loggedIn: false };
   return user && user.loggedIn;
};

const ProtectedRoutes = () => {
   const isAuth = useAuth();

   return isAuth ? <Outlet /> : <Home />;
};

export default ProtectedRoutes;
