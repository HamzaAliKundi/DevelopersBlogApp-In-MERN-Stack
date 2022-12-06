import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshTokenSetup } from "../utils/rereshToken";
import LoginModel from "./LoginModel";
import EmailModel from "./EmailModel";
import SignUpMoadel from "./SignUpMoadel";
import CommentsRender from "./CommentsRender";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Spinner from "./Spinner";

const Comment = ({ blogId }) => {
   const [visibleLogin, setVisibleLogin] = useState(false);
   const [visibleLoginEmail, setVisibleLoginEmail] = useState(false);
   const [visibleLoginModel, setVisbleLoginModel] = useState(false);
   const [comment, setComment] = useState({ value: "", _id: "" });
   const [blogComment, setBlogComment] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const navigate = useNavigate();
   const token = localStorage.getItem("token");

   const onChangeValue = (e) => {
      setComment((prevState) => ({
         ...prevState,
         value: e.target.value,
      }));
   };

   // ========================================================================================== Getting Comments
   useEffect(() => {
      setIsLoading(true);
      const getComments = async () => {
         await axios
            .get(`http://localhost:5000/api/blog/comments/${blogId}`)
            .then((res) => {
               setBlogComment(res.data);
               navigate(`/blogDetail/${blogId}`);
               setIsLoading(false);
            })
            .catch((err) => {
               console.log("Error => ", err);
            });
      };

      getComments();
   }, [blogId, navigate]);

   // ========================================================================================== Posting Comment
   const submit = async (e) => {
      debugger;
      e.preventDefault();

      if (!comment._id) {
         const jwt = localStorage.getItem("token");
         const user = jwtDecode(jwt);
         const author = user.name;

         const apiUrl = "http://localhost:5000/api/blog/comments";
         const token = localStorage.getItem("token");
         const config = {
            headers: { Authorization: `Bearer ${token}` },
         };
         const commentObj = {
            blogId: blogId,
            author: author,
            comment: comment.value,
         };

         try {
            await axios.post(apiUrl, commentObj, config).then((res) => {
               setComment({ value: "", _id: "" });
               // window.location.reload();
               toast.success("Comment Published Successfully");
            });
         } catch (ex) {
            console.log("Error ex : ", ex);
            toast.error("Exception while Posting a comment");
         }
      } else {
         const jwt = localStorage.getItem("token");
         const user = jwtDecode(jwt);
         const author = user.name;

         const apiUrl = `http://localhost:5000/api/blog/comments/${comment._id}`;
         const token = localStorage.getItem("token");
         const config = {
            headers: { Authorization: `Bearer ${token}` },
         };
         const commentObj = {
            _id: comment._id,
            blogId: blogId,
            author: author,
            comment: comment.value,
         };

         try {
            await axios.put(apiUrl, commentObj, config).then((res) => {
               setComment({ value: "", _id: "" });
               // window.location.reload();
               toast.success("Comment Updated Successfully");
            });
         } catch (ex) {
            console.log("Error ex : ", ex);
            toast.error("Exception while Updating a comment");
         }
      }

      try {
         axios
            .get(`http://localhost:5000/api/blog/comments/${blogId}`)
            .then((res) => {
               setBlogComment(res.data);
            });
      } catch (error) {
         console.log("Error while fetching comments : ", error);
      }
   };

   // ========================================================================================== Getting single comment for update
   const getSingleCommentObj = async (blogComment) => {
      debugger;
      const apiUrl = `http://localhost:5000/api/blog/comments/singlecomment/${blogComment._id}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: { Authorization: `Bearer ${token}` },
      };

      try {
         await axios.get(apiUrl, config).then((res) => {
            setComment({ value: res.data.comment, _id: res.data._id });
         });
      } catch (ex) {
         console.log("Exception :", ex);
      }
   };

   // ========================================================================================== Deleting Comment
   const deleteComment = async (blog) => {
      const apiUrl = `http://localhost:5000/api/blog/comments/${blog._id}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: { Authorization: `Bearer ${token}` },
      };

      try {
         await axios.delete(apiUrl, config);
         toast.success("Comment Deleted");
      } catch (error) {
         console.log(error);
         toast.error("Exception while deleting a comment");
      }

      const newCommentsArray = blogComment.filter(
         (comment) => comment._id !== blog._id
      );
      setBlogComment(newCommentsArray);
   };

   const responseSuccessGoogle = (res) => {
      console.log("Login Success: currentUser:", res.profileObj);
      refreshTokenSetup(res);

      axios({
         method: "POST",
         url: "http://localhost:5000/api/googlelogin",
         data: { tokenId: res.tokenId },
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
         <div
            className=" d-flex justify-content-center "
            style={{ width: "100%" }}
         >
            <div
               className="shadow-lg d-flex justify-content-center py-5 mb-5 rounded-3 "
               style={{ width: "900px", fontFamily: "koHo" }}
            >
               <div>
                  <div>
                     <h4>Comment Section</h4>
                     <p>Your Comments are valuable to us</p>
                     <hr style={{ width: "700px" }} />
                  </div>
                  <div className=" d-flex justify-content-center mt-5">
                     {token ? (
                        <form onSubmit={submit}>
                           <textarea
                              name="textarea"
                              id="textarea"
                              cols="50"
                              rows="5"
                              placeholder="Please enter your remarks"
                              className="px-3"
                              value={comment.value}
                              onChange={onChangeValue}
                              style={{
                                 border: "1px solid lightgray",
                                 borderRadius: "20px",
                              }}
                           ></textarea>
                           <br />
                           {!comment._id ? (
                              <button
                                 type="submit"
                                 className="btn btn-success rounded-3 px-5 py-2 mt-3 d-block w-100 "
                              >
                                 Publish Comment
                              </button>
                           ) : (
                              <button
                                 type="submit"
                                 className="btn btn-success rounded-3 px-5 py-2 mt-3 d-block w-100 "
                              >
                                 Update Comment
                              </button>
                           )}
                        </form>
                     ) : (
                        <button
                           onClick={() => setVisibleLogin(true)}
                           className="btn btn-light shadow px-5 py-2"
                           style={{ border: "1px solid lightgray" }}
                        >
                           What are your thoughts ?
                        </button>
                     )}
                  </div>
                  {isLoading ? (
                     <Spinner />
                  ) : (
                     <div>
                        {blogComment.map((blog) => (
                           <CommentsRender
                              key={blog._id}
                              blogComment={blog}
                              author={blog.author}
                              comment={blog.comment}
                              createdAt={blog.createdAt}
                              getSingleCommentObj={getSingleCommentObj}
                              deleteComment={deleteComment}
                           />
                        ))}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default Comment;
