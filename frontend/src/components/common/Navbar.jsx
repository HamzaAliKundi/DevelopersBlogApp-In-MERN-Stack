import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { refreshTokenSetup } from "../utils/rereshToken";
import EmailModel from "./EmailModel";
import LoginModel from "./LoginModel";
import SignUpMoadel from "./SignUpMoadel";
import axios from "axios";
import "../../css/style.css";

const Navbar = () => {
   const [visibleLogin, setVisibleLogin] = useState(false);
   const [visibleLoginEmail, setVisibleLoginEmail] = useState(false);
   const [visibleLoginModel, setVisbleLoginModel] = useState(false);

   const responseSuccessGoogle = (response) => {
      refreshTokenSetup(response);

      axios({
         method: "POST",
         url: "http://localhost:5000/api/googlelogin",
         data: { tokenId: response.tokenId },
      })
         .then((response) => {
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
   };

   const jumpToLoginModel = () => {
      setVisibleLoginEmail(false);
      setVisbleLoginModel(true);
   };

   const loginWithEmail = () => {
      setVisibleLogin(false);
      setVisbleLoginModel(true);
   };

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

         <div className="navbar_my" style={{ backgroundColor: "#001529" }}>
            <div className="logo">
               <img
                  src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png"
                  alt=""
                  className="img-fluid styling_logo"
               />
            </div>
            <div className="links">
               {/* <Link className="link_color" to="#">
            <div style={{ color: "white" }}> Our story</div>
          </Link>
          <Link className="link_color" to="#">
            <div style={{ color: "white" }}> Membership </div>
          </Link>
          <Link className="link_color" to="#">
            <div style={{ color: "white" }}> Write </div>
          </Link> */}
               <Link
                  className="link_color"
                  to="#"
                  type="primary"
                  onClick={() => setVisibleLogin(true)}
               >
                  <div style={{ color: "white" }}>Sign in</div>
               </Link>
               <button
                  className="btn btn-light text-light px-3 py-1 bg-dark"
                  style={{ border: "none", borderRadius: "20px" }}
               >
                  <Link
                     type="primary"
                     onClick={() => setVisibleLogin(true)}
                     style={{ color: "white" }}
                     to="#"
                  >
                     Get Started
                  </Link>
               </button>
            </div>
         </div>
         <hr className="bg-dark" />
      </>
   );
};

export default Navbar;
