import { useState } from "react";
import { Link } from "react-router-dom";
import { refreshTokenSetup } from "../utils/rereshToken";
import LoginModel from "./LoginModel";
import EmailModel from "./EmailModel";
import SignUpMoadel from "./SignUpMoadel";
import "../../css/style.css";

const Header = () => {
   const [visibleLogin, setVisibleLogin] = useState(false);
   const [visibleLoginEmail, setVisibleLoginEmail] = useState(false);
   const [visibleLoginModel, setVisbleLoginModel] = useState(false);

   const responseSuccessGoogle = (res) => {
      console.log("Login Success: currentUser:", res.profileObj);
      refreshTokenSetup(res);
   };

   const responseFailureGoogle = (res) => {
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
      <section>
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

         <div
            className="container-fluid header_height"
            style={{ backgroundColor: "#001529", color: "lightgray" }}
         >
            <div className="row">
               <div className="col-lg-6 header_design">
                  <div>
                     <h1 style={{ color: "lightgray" }}>Stay curious.</h1>
                     <p>
                        Discover stories, thinking, and expertise from writers
                        on any topic.
                     </p>
                     <Link
                        onClick={() => setVisibleLogin(true)}
                        to="#"
                        className="btn btn-dark btn_design"
                     >
                        Start Reading
                     </Link>
                  </div>
               </div>
               <div className="col-lg-6"></div>
            </div>
         </div>
         <hr />
      </section>
   );
};

export default Header;
