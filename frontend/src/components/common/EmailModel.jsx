import React from "react";
import { Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "../../css/style.css";

const EmailModel = ({
   visibleLoginEmail,
   setVisibleLoginEmail,
   setVisbleLoginModel,
}) => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [showPassword, setShowPassword] = useState(true);
   const [showConfirmPassword, setConfirmShowPassword] = useState(true);

   const handleShowPasswordIcon = () => {
      setShowPassword(true);
   };

   const handlehidePasswordIcon = () => {
      setShowPassword(false);
   };

   const handleShowConfirmPasswordIcon = () => {
      setConfirmShowPassword(true);
   };

   const handlehideConfirmPasswordIcon = () => {
      setConfirmShowPassword(false);
   };

   const signInUser = async (e) => {
      e.preventDefault();

      if (password === confirmPassword) {
         const userObj = {
            name: name,
            email: email.toLowerCase(),
            password: password,
         };

         debugger;

         try {
            await axios
               .post("http://localhost:5000/api/users", userObj)
               .then((res) => {
                  console.log("Res => :", res.data);
                  localStorage.setItem("token", res.data);
               });
            // console.log("Jwt :", jwt);
            jumpToLoginModel();
         } catch (ex) {
            console.log("error", ex);
            if (ex.response && ex.response.status === 400) {
               toast.warning("User already registered");
            }
         }
      } else {
         toast.info("Inavalid Password Combination ...");
      }
   };

   const jumpToLoginModel = () => {
      setVisibleLoginEmail(false);
      setVisbleLoginModel(true);
   };

   return (
      <>
         <Modal
            centered
            visible={visibleLoginEmail}
            onOk={() => setVisibleLoginEmail(false)}
            onCancel={() => setVisibleLoginEmail(false)}
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
               <h3>Register here & create Blog for Developers</h3>
            </div>
            <br />
            <br />
            <div className="d-flex justify-content-center">
               <form onSubmit={signInUser}>
                  <div className="form-group">
                     <label htmlFor="name">Name</label>
                     <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        required={true}
                        style={{ width: "400px" }}
                     />
                  </div>
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
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 4 or more characters"
                        required={true}
                        className="form-control"
                        style={{ width: "400px" }}
                     />
                     {showPassword ? (
                        <FaEyeSlash
                           className="password-icon"
                           onClick={handlehidePasswordIcon}
                        />
                     ) : (
                        <FaEye
                           onClick={handleShowPasswordIcon}
                           className="password-icon"
                        />
                     )}
                  </div>
                  <div className="form-group mt-3">
                     <label htmlFor="password">Confirm Password</label>
                     <input
                        type={showConfirmPassword ? "password" : "text"}
                        name="c-password"
                        id="c-password"
                        value={confirmPassword}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 4 or more characters"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={true}
                        className="form-control"
                        style={{ width: "400px" }}
                     />
                     {showConfirmPassword ? (
                        <FaEyeSlash
                           className="c-password-icon"
                           onClick={handlehideConfirmPasswordIcon}
                        />
                     ) : (
                        <FaEye
                           onClick={handleShowConfirmPasswordIcon}
                           className="c-password-icon"
                        />
                     )}
                  </div>
                  <div className="button mt-5">
                     <button
                        type="submit "
                        className="btn btn-dark d-block"
                        style={{ width: "400px" }}
                     >
                        Register
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

export default EmailModel;
