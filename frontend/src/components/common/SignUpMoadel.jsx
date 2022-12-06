import React from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import GoogleLogin from "react-google-login";
import "../../css/style.css";

const SignUpMoadel = (props) => {
   const {
      visibleLogin,
      setVisibleLogin,
      responseSuccessGoogle,
      responseFailureGoogle,
      registerWithEmail,
      refreshTokenSetup,
      loginWithEmail,
   } = props;

   return (
      <>
         <Modal
            centered
            visible={visibleLogin}
            onOk={() => setVisibleLogin(false)}
            onCancel={() => setVisibleLogin(false)}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            width={900}
            className="shadow-lg font_icon_font_family_syle"
            style={{ fontWeight: "bold" }}
         >
            <br />
            <br />
            <br />
            <div className="d-flex justify-content-center ">
               <h3>Welcome to Developer's Blog.</h3>
            </div>
            <br />
            <br />
            <div className="d-flex justify-content-center">
               <div className="accounts ">
                  <div>
                     <GoogleLogin
                        clientId="340636402788-k287jmsa8kbmuhb3gi3ifdtg054vfu6l.apps.googleusercontent.com"
                        buttonText="Login With Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseFailureGoogle}
                        cookiePolicy={"single_host_origin"}
                        refreshTokenSetup={refreshTokenSetup}
                        className="style_google_login bg-light w-100 justify-content-center"
                     />
                  </div>

                  <br />
                  <Link
                     to="#"
                     onClick={loginWithEmail}
                     className="btn bg-light py-2 px-3 mt-2"
                     style={{
                        borderRadius: "20px",
                        border: "1px solid #C0C0C0",
                        width: "320px",
                     }}
                  >
                     <FaEnvelope
                        className="mx-2 mb-1 "
                        style={{ fontSize: "20px" }}
                     />
                     Sign in with Email
                  </Link>
                  <p
                     className="d-flex justify-content-center mt-5"
                     style={{ fontWeight: "bold" }}
                  >
                     No account?
                     <Link
                        onClick={registerWithEmail}
                        to="#"
                        className="text-success px-1"
                     >
                        {" "}
                        <b>Create one</b>
                     </Link>
                  </p>
               </div>
            </div>
            <p className="d-flex justify-content-center mt-5">
               Click “Sign In” to agree to Developers Blog's Terms of Service
               and acknowledge that
            </p>
            <p className="d-flex justify-content-center mb-5">
               {" "}
               Developers Blog's Privacy Policy applies to you.{" "}
            </p>
         </Modal>
      </>
   );
};

export default SignUpMoadel;
