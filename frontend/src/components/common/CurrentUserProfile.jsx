import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaEdit } from "react-icons/fa";
import Spinner from "./Spinner";
import ProfileBlogsDetail from "./ProfileBlogsDetail";

import axios from "axios";
import jwtDecode from "jwt-decode";
import InfiniteScroll from "react-infinite-scroll-component";

const CurrentUserProfile = () => {
   const [currentUserBlog, setCurrentUserBlog] = useState([]);
   const [totalCount, setTotalCount] = useState(0);
   const [isLoading, setIsLoading] = useState(false);

   const jwt = localStorage.getItem("token");
   const user = jwtDecode(jwt);

   const pageLimit = 2;
   const apiUrl = `http://localhost:5000/api/blog/userprofileblogs/${user.id}`;
   const token = localStorage.getItem("token");
   const config = {
      headers: { Authorization: `Bearer ${token}` },
   };

   const getBlogsList = () => {
      let pageNo = Math.ceil(currentUserBlog.length / pageLimit) - 1 + 1;
      const queryParam = "?page=" + pageNo;
      const finalUrl = apiUrl + queryParam;
      axios.get(finalUrl, config).then((res) => {
         const { blog: apiRes } = res?.data;
         const { total: totalCount } = res?.data;
         const mergData = [...currentUserBlog, ...apiRes];
         setTotalCount(totalCount);
         setCurrentUserBlog(mergData);
      });
   };

   useEffect(() => {
      setIsLoading(true);
      getBlogsList();
      setIsLoading(false);
   }, []);

   const fetchMoreData = () => {
      if (currentUserBlog.length < totalCount) {
         getBlogsList();
      }
   };

   const deleteBlog = async (blog) => {
      const apiUrl = `http://localhost:5000/api/blog/${blog._id}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: { Authorization: `Bearer ${token}` },
      };

      try {
         await axios.delete(apiUrl, config);
         toast.success("Blog Deleted");
      } catch (error) {
         console.log(error);
         toast.error("Exception while deleting a Blog");
      }

      const newCommentsArray = currentUserBlog.filter(
         (comment) => comment._id !== blog._id
      );
      setCurrentUserBlog(newCommentsArray);
   };

   return (
      <>
         <div
            className="navbar_ d-flex justify-content-around align-items-center shadow"
            style={{ width: "100%", height: "10%", backgroundColor: "#001529" }}
         >
            <Link to="/" className="logo">
               <img
                  src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png"
                  alt=""
                  style={{ width: "120px", height: "80px" }}
               />
            </Link>
            <Link
               to="/logout"
               className="Logout"
               style={{ fontSize: "20px", cursor: "pointer", color: "white" }}
               title="Logout"
            >
               Logout <FaSignOutAlt />
            </Link>
         </div>
         <div
            className="container-fluid d-flex mt-5 justify-content-center"
            style={{ fontFamily: "koHo" }}
         >
            <h2 className="mt-5">
               Welcome <b>{user.name}</b> to Developers Blog
            </h2>
         </div>
         <div className="d-flex justify-content-center mt-3">
            <hr
               className="w-50 py-1 rounded-3 shadow-lg "
               style={{ border: "2px solid lightgray" }}
            />
         </div>

         <div className="mt-5 mx- d-flex container-fluid">
            <div className="user_image mx-5">
               <img
                  src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                  alt=""
                  className="mx-5"
                  style={{
                     width: "300px",
                     borderRadius: "50%",
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                     backgroundRepeat: "no-repeat",
                  }}
               />
            </div>
            <div className="mt-4 user_name">
               <h4>{user.name}</h4>
               <p className="mt-1">
                  E-mail : <u> {user.email}</u>
               </p>
            </div>
         </div>

         <div className="d-flex justify-content-center mt-3">
            <hr
               className="w-100 mt-4 py- rounded-3 bg-ligh shadow-lg "
               style={{ border: "2px solid lightgray" }}
            />
         </div>

         <div className="usersBlog mt-5 d-flex justify-content-center">
            <h4 sylye={{ fontFamily: "koHo" }}>Your Blogs</h4>
         </div>
         <div className="d-flex justify-content-center">
            <hr className="w-25 pt-1 rounded-3 shadow-lg mt-3" />
         </div>
         {currentUserBlog.length > 0 ? (
            <InfiniteScroll
               dataLength={currentUserBlog.length}
               next={fetchMoreData}
               hasMore={currentUserBlog.length < totalCount}
               loader={<Spinner />}
            >
               {isLoading ? (
                  <Spinner />
               ) : (
                  <div>
                     {currentUserBlog.map((blog) => (
                        <ProfileBlogsDetail
                           key={blog._id}
                           blog={blog}
                           author={blog.author}
                           createdAt={blog.createdAt}
                           title={blog.title}
                           subtitle={blog.subtitle}
                           description={blog.description}
                           category={blog.category}
                           deleteBlog={deleteBlog}
                           picture={blog.image}
                        />
                     ))}
                  </div>
               )}
            </InfiniteScroll>
         ) : (
            <div className="container-fluid align-items-center py-5 d-flex justify-content-center">
               <p
                  className="mx-5"
                  style={{ fontSize: "40px", fontFamily: "koHo" }}
               >
                  No Blogs yet, Create your Blog
               </p>
               <div style={{ fontSize: "30px" }} className="text-info">
                  <Link to="/writeBlog">
                     <FaEdit />
                  </Link>
               </div>
            </div>
         )}
      </>
   );
};

export default CurrentUserProfile;
