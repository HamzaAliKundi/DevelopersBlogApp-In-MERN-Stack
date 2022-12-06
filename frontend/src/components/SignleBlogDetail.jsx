import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./common/Comment";
import LoginModel from "./common/LoginModel";
import EmailModel from "./common/EmailModel";
import SignUpMoadel from "./common/SignUpMoadel";
import axios from "axios";

const SignleBlogDetail = () => {
   const [blogData, setBlogData] = useState({});
   const [visibleLogin, setVisibleLogin] = useState(false);
   const [visibleLoginEmail, setVisibleLoginEmail] = useState(false);
   const [visibleLoginModel, setVisbleLoginModel] = useState(false);

   const params = useParams();
   const blogId = params.id;

   useEffect(() => {
      const fetchSingleBlogObject = async () => {
         await axios
            .get(`http://localhost:5000/api/blog/${blogId}`)
            .then((res) => {
               setBlogData(res.data);
            });
      };

      fetchSingleBlogObject();
   }, [blogId]);

   const responseSuccessGoogle = (res) => {
      console.log("SuccessGoogle:", res);
   };

   const responseFailureGoogle = (res) => {
      console.log("FailureGoogle:", res);
   };

   const registerWithEmail = () => {
      setVisibleLogin(false);
      setVisibleLoginEmail(true);
   };

   const jumpToLoginModel = () => {
      setVisibleLoginEmail(false);
      setVisbleLoginModel(true);
   };

   const loginWithEmail = () => {
      setVisibleLogin(false);
      setVisbleLoginModel(true);
   };

   const token = localStorage.getItem("token");

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
         />
         <div
            className="shadow d-flex justify-content-around align-items-center"
            style={{ height: "80px", paddingLeft: "100px" }}
         >
            <Link to="/" className="logo">
               <img
                  src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png"
                  alt=""
                  style={{ width: "80px" }}
               />
            </Link>
            {token ? (
               <div
                  onClick={() => setVisibleLogin(true)}
                  className="write_blog d-none"
                  style={{ fontSize: "25px", cursor: "pointer" }}
               >
                  <FaEdit />
               </div>
            ) : (
               <div
                  onClick={() => setVisibleLogin(true)}
                  className="write_blog"
                  style={{ fontSize: "25px", cursor: "pointer" }}
               >
                  <FaEdit />
               </div>
            )}
         </div>
         <div
            className="mt-5 d-flex justify-content-center"
            style={{ width: "100%", fontFamily: "koHo" }}
         >
            <div style={{ width: "48%" }}>
               <div className="d-flex align-items-center">
                  <div>
                     <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        alt=""
                        style={{ width: "50px", borderRadius: "40px" }}
                     />
                  </div>
                  <div className="name+date mx-3">
                     <div className="name py-1">
                        {" "}
                        <b>{blogData.author}</b>
                     </div>
                     <div className="date" style={{ color: "lightgray" }}>
                        {new Date(blogData.createdAt).toLocaleString("en-US")}
                     </div>
                  </div>
               </div>
               <div className="heading mt-4">
                  <h1>{blogData.title}</h1>{" "}
               </div>
               <div className="heading mt-2">
                  <h5 style={{ color: "lightgray" }}>{blogData.subtitle}</h5>{" "}
               </div>
               <div className="img mt-5">
                  <img
                     src={blogData.image}
                     alt=""
                     style={{ width: "700px", height: "400px" }}
                  />
               </div>

               <div
                  className="description my-5"
                  style={{ fontSize: "20px", fontFamily: "koHo" }}
               >
                  <div
                     dangerouslySetInnerHTML={{ __html: blogData.description }}
                  ></div>
               </div>
            </div>
         </div>
         {/* ================================================================= Comment Scetion */}
         <div className="comment">
            <Comment blogId={blogId} />
         </div>
      </>
   );
};

export default SignleBlogDetail;
