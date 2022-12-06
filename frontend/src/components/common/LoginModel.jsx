import React from "react";
import { Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../../css/style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginModel = ({ visibleLoginModel, setVisbleLoginModel }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(true);

   const handleShowPasswordIcon = () => {
      setShowPassword(true);
   };

   const handlehidePasswordIcon = () => {
      setShowPassword(false);
   };

   const signInUser = async (e) => {
      e.preventDefault();

      const userObj = {
         email: email.toLowerCase(),
         password: password,
      };

      try {
         const { data: jwt } = await axios.post(
            "http://localhost:5000/api/users/login",
            userObj
         );
         console.log("Jwt :", jwt);
         localStorage.setItem("token", jwt.token);
         window.location = "/loginPage";
      } catch (ex) {
         console.log("error", ex);
         if (ex.response && ex.response.status === 400) {
            toast.warning("invalid email and password combination");
         }
      }
   };

   return (
      <>
         <Modal
            centered
            visible={visibleLoginModel}
            onOk={() => setVisbleLoginModel(false)}
            onCancel={() => setVisbleLoginModel(false)}
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
               <h3>Fill the credientilas and Login to create Blogs</h3>
            </div>
            <br />
            <br />
            <div className="d-flex justify-content-center">
               <form onSubmit={signInUser}>
                  <div className="form-group mt-3">
                     <label htmlFor="email">Email</label>
                     <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required={true}
                        style={{ width: "400px" }}
                     />
                  </div>
                  <div className="form-group mt-3">
                     <label htmlFor="password">Password</label>
                     <input
                        type={showPassword ? "password" : "text"}
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                        className="form-control"
                        style={{ width: "400px" }}
                     />
                     {showPassword ? (
                        <FaEyeSlash
                           className="password-icon-login"
                           onClick={handlehidePasswordIcon}
                        />
                     ) : (
                        <FaEye
                           onClick={handleShowPasswordIcon}
                           className="password-icon-login"
                        />
                     )}
                  </div>
                  <div className="button mt-5">
                     <button
                        type="submit "
                        className="btn btn-dark d-block"
                        style={{ width: "400px" }}
                     >
                        Sign In
                     </button>
                  </div>
               </form>
            </div>
            <p className="d-flex justify-content-center mt-5">
               Click “Sign In” to agree to Medium’s Terms of Service and
               acknowledge that
            </p>
            <p className="d-flex justify-content-center mb-5">
               {" "}
               Medium’s Privacy Policy applies to you.{" "}
            </p>
         </Modal>
      </>
   );
};

export default LoginModel;
