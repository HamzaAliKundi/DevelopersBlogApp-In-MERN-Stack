import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHome, FaRegEdit } from "react-icons/fa";
import BlogRenderModule from "./common/BlogRenderModule";
import jwtDecode from "jwt-decode";
import ".././css/style.css";

const LoginUserPage = () => {
   const [currentUser, setCurrentUser] = useState("");
   console.log("User : ", currentUser);

   useEffect(() => {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setCurrentUser(user);
   }, []);

   return (
      <div className="main_div">
         {/* ====================================================== LEFT SIDE */}
         <div
            className="left_side_links_progile"
            style={{ position: "sticky", top: "0rem", fontFamily: "koHo" }}
         >
            <div className="link_1">
               <img
                  src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png"
                  alt=""
                  className="design_login_user_page_logo"
               />
            </div>
            <div className="links">
               <div className="icons_design">
                  <FaHome />
               </div>
               <hr className="my-4" />
               <Link
                  to="/writeBlog"
                  className="icons_design"
                  style={{ color: "black" }}
                  title="Write Blog"
               >
                  <FaRegEdit />
               </Link>
            </div>
            <Link to={`/userProfile/${currentUser.id}`} className="profile">
               <Tooltip
                  placement="rightTop"
                  title={currentUser.name}
                  style={{ width: "300px" }}
               >
                  <img
                     src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                     alt=""
                     className="singn_in_blogger_pic"
                  />
               </Tooltip>
            </Link>
         </div>
         <div className="vl"></div>
         {/* ===================================================== MIDDLE SIDE */}
         <div className="left_side_links_blog">
            <BlogRenderModule />
         </div>
      </div>
   );
};

export default LoginUserPage;
