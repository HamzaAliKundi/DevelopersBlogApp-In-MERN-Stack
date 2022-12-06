import React, { useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import { refreshTokenSetup } from "../utils/rereshToken";
import LoginModel from "./LoginModel";
import EmailModel from "./EmailModel";
import SignUpMoadel from "./SignUpMoadel";
import axios from "axios";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import "../../css/style.css";

const RenderHomePageBlogs = ({
   category,
   title,
   subtitle,
   author,
   createdAt,
   id,
   noOfBlogs,
   description,
   picture,
}) => {
   const [show, setShow] = useState(false);
   const [visibleLogin, setVisibleLogin] = useState(false);
   const [visibleLoginEmail, setVisibleLoginEmail] = useState(false);
   const [visibleLoginModel, setVisbleLoginModel] = useState(false);
   const target = useRef(null);

   const responseSuccessGoogle = (response) => {
      refreshTokenSetup(response);

      axios({
         method: "POST",
         url: "http://localhost:5000/api/googlelogin",
         data: { tokenId: response.tokenId },
      })
         .then((response) => {
            console.log("Google Login Success : ", response.data.token);
            localStorage.setItem("token", response.data.token);
            window.location = "/loginPage";
            toast.success("Login With Google Successfull");
         })
         .catch((ex) => {
            toast.error("Error while login with Google ...");
            console.log("Exception while login with Google ...", ex);
         });
   };

   const responseFailureGoogle = async (res) => {
      console.log("Login failed: res:", res);
   };

   const registerWithEmail = () => {
      setVisibleLogin(false);
      setVisibleLoginEmail(true);
      setShow(false);
   };

   const jumpToLoginModel = () => {
      setVisibleLoginEmail(false);
      setVisbleLoginModel(true);
      setShow(false);
   };

   const loginWithEmail = () => {
      setShow(false);
      setVisibleLogin(false);
      setVisbleLoginModel(true);
   };

   const hideTooltipHandler = () => {
      setShow(false);
   };

   const d = new Date(createdAt);
   let date = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes();

   return (
      <>
         <LoginModel
            visibleLoginModel={visibleLoginModel}
            setVisbleLoginModel={setVisbleLoginModel}
         />

         <EmailModel
            visibleLoginEmail={visibleLoginEmail}
            setVisibleLoginEmail={setVisibleLoginEmail}
            jumpToLoginModel={jumpToLoginModel}
            setVisbleLoginModel={setVisbleLoginModel}
         />

         <SignUpMoadel
            visibleLogin={visibleLogin}
            setVisibleLogin={setVisibleLogin}
            responseSuccessGoogle={responseSuccessGoogle}
            responseFailureGoogle={responseFailureGoogle}
            registerWithEmail={registerWithEmail}
            loginWithEmail={loginWithEmail}
            refreshTokenSetup={refreshTokenSetup}
         />
         {noOfBlogs.length > 0 ? (
            <div
               className="main_div_for_d-flex shadow py-5 mx-4 rounded-3"
               style={{ fontFamily: "koHo", border: "1px solid lightgray" }}
            >
               <hr />
               <div className="blog_detail_side-left px-5">
                  <div className="d-flex align-items-center">
                     <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        alt=""
                        className="home_blog_author_pic"
                     />
                     <div className="mx-3">{author}</div>
                  </div>
                  <Link to={`/blogDetail/${id}`} className="title">
                     <h3 className="mt-3">{title}</h3>
                  </Link>
                  <Link to={`/blogDetail/${id}`} className="title">
                     <h6 className="mt-1" style={{ color: "lightgray" }}>
                        SubTitle: {subtitle}
                     </h6>
                  </Link>
                  <div className="date mt-4 d-flex justify-content-between align-items-center">
                     {/* {new Date(createdAt).toLocaleString("en-US")} */}
                     <div className="div">
                        {date}
                        {category.map((cati, index) => (
                           <button
                              key={index}
                              className="btn btn-light mx-1 px-3 py-1"
                              style={{
                                 borderRadius: "20px",
                                 border: "1px solid lightgray",
                              }}
                           >
                              {cati}
                           </button>
                        ))}
                     </div>
                     {/* ^&*() */}
                     <div className="div" style={{ cursor: "pointer" }}>
                        <div
                           ref={target}
                           onClick={() => setShow(!show)}
                           style={{ cursor: "pointer" }}
                        >
                           <FaEllipsisH />
                        </div>
                        <Overlay
                           target={target.current}
                           show={show}
                           placement="right"
                        >
                           {(props) => (
                              <Tooltip
                                 id="overlay-example"
                                 {...props}
                                 className="px-2"
                              >
                                 <button
                                    onClick={() => setVisibleLogin(true)}
                                    className="btn btn-black py-1 px-3 text-light"
                                 >
                                    <div onClick={hideTooltipHandler}>
                                       Report
                                    </div>
                                 </button>
                              </Tooltip>
                           )}
                        </Overlay>
                     </div>
                     {/* &*() */}
                  </div>
               </div>

               <Link
                  to={`/blogDetail/${id}`}
                  className="blog_picture_side_right d-flex align-items-center"
               >
                  <img
                     src={picture}
                     alt=""
                     style={{ width: "150px", height: "100px" }}
                     className="shadow-lg rounded-3"
                  />
               </Link>
            </div>
         ) : (
            <h1>No Blogs fot this search</h1>
         )}
      </>
   );
};

export default RenderHomePageBlogs;
