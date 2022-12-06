import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import RenderLoginUserHomePageBlog from "./RenderLoginUserHomePageBlog";
import SearchInput from "./SearchInput";
import axios from "axios";
import Spinner from "./Spinner";
import jwtDecode from "jwt-decode";
import ReactPaginate from "react-paginate";
import "../../css/style.css";
import BlogRenderMoguleButton from "./BlogRenderMoguleButton";

const BlogRenderModule = () => {
   const [currentUser, setCurrentUser] = useState("");
   const [homePageBlogs, setHomePageBlogs] = useState([]);
   const [pagesCount, setPagesCount] = useState(0);
   const [currentPage] = useState(0);
   const [searchTerm, setSearchTerm] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [searchResults, setSearchResults] = useState([]);
   const [paginate, setPaginate] = useState(true);

   useEffect(() => {
      const FetchHomePageBlogs = async () => {
         setIsLoading(true);
         fetch(`http://localhost:5000/api/blog?page=${currentPage}`)
            .then((response) => response.json())
            .then(({ totalPages, blog }) => {
               // console.log(blog);
               setHomePageBlogs(blog);
               setPagesCount(totalPages);
               setIsLoading(false);
            });
      };

      FetchHomePageBlogs();
   }, [currentPage]);

   const handlePageClick = async (data) => {
      const currentBlogPage = data.selected - 1 + 1;

      await axios
         .get(`http://localhost:5000/api/blog?page=${currentBlogPage}`)
         .then((res) => {
            const { blog: paginatedBlogs } = res.data;
            setHomePageBlogs(paginatedBlogs);
         });
   };

   useEffect(() => {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setCurrentUser(user);
   }, []);

   const searchHandler = (searchTerm) => {
      setSearchTerm(searchTerm);

      if (searchTerm !== "") {
         const newPageBlogs = homePageBlogs.filter((blog) => {
            return Object.values(blog)
               .join(" ")
               .toLowerCase()
               .includes(searchTerm.toLowerCase());
         });
         setSearchResults(newPageBlogs);
      } else {
         setSearchResults(homePageBlogs);
      }
   };

   const deleteBlog = async (blog) => {
      console.log("Delete blog object :", blog);
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
         toast.error("Exception while deleting a comment");
      }

      const newCommentsArray = homePageBlogs.filter(
         (comment) => comment._id !== blog._id
      );
      setHomePageBlogs(newCommentsArray);
   };

   const filterItem = async (categoryItem) => {
      if (categoryItem === "allBlogs") {
         setPaginate(true);
      } else {
         setPaginate(false);
      }

      await axios
         .get(
            `http://localhost:5000/api/blog/getfilteredblog/${categoryItem}?page=${currentPage}`
         )
         .then((res) => {
            const { filteredBlogs: filteredItem } = res.data;
            const { totalPages: totalPagesItems } = res.data;
            setHomePageBlogs(filteredItem);
            setPagesCount(totalPagesItems);
         });
   };

   const handleFilteredPageClick = async (data) => {
      console.log("data => ", data.selected);

      // await axios
      //    .get(
      //       `http://localhost:5000/api/blog/getfilteredblog/${categoryItem}?page=${currentPage}`
      //    )
      //    .then((res) => {
      //       console.log("res => :", res.data);
      //    });
   };

   return (
      <>
         <div className="d-flex defin_main_div_width">
            <div className="defin_width_of_blogs">
               <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ fontFamily: "koHo" }}
               >
                  <Link
                     className="d-flex"
                     to={`/userProfile/${currentUser.id}`}
                  >
                     <FaUser
                        className="mx-1 mt-1"
                        style={{ color: "#001529" }}
                     />
                     <p className="" style={{ color: "#001529" }}>
                        {" "}
                        <u> {currentUser.name}</u>
                     </p>
                  </Link>
                  <Link
                     to="/logout"
                     className="btn btn-outline-danger w-25 py-1 mx-3"
                     style={{ borderRadius: "20px" }}
                  >
                     Logout
                     <FaSignOutAlt className="mx-2" />
                  </Link>
               </div>
               <hr className="mb-5 pt-1 rounded-3 shadow mt-3" />
               <div className="shadow">
                  <SearchInput
                     term={searchTerm}
                     searchKeyWord={searchHandler}
                  />
               </div>

               {isLoading ? (
                  <Spinner />
               ) : (
                  <div className="div">
                     {homePageBlogs.length > 0 ? (
                        <div className="div">
                           <div style={{ fontFamily: "koHo" }}>
                              {searchTerm.length < 1
                                 ? homePageBlogs.map((blog) => (
                                      <RenderLoginUserHomePageBlog
                                         key={blog._id}
                                         id={blog._id}
                                         author={blog.author}
                                         blog={blog}
                                         category={blog.category}
                                         title={blog.title}
                                         subtitle={blog.subtitle}
                                         description={blog.description}
                                         createdAt={blog.createdAt}
                                         picture={blog.image}
                                         deleteBlog={deleteBlog}
                                      />
                                   ))
                                 : searchResults.map((blog) => (
                                      <RenderLoginUserHomePageBlog
                                         key={blog._id}
                                         id={blog._id}
                                         author={blog.author}
                                         blog={blog}
                                         category={blog.category}
                                         title={blog.title}
                                         subtitle={blog.subtitle}
                                         description={blog.description}
                                         createdAt={blog.createdAt}
                                         picture={blog.image}
                                         deleteBlog={deleteBlog}
                                      />
                                   ))}
                           </div>
                           <div className="my-5" style={{ fontSize: "25px" }}>
                              <ReactPaginate
                                 previousLabel={"< Previous"}
                                 nextLabel={"Next >"}
                                 breakLabel={"..."}
                                 pageCount={pagesCount}
                                 marginPagesDisplayed={2}
                                 pageRangeDisplayed={3}
                                 onPageChange={
                                    paginate
                                       ? handlePageClick
                                       : handleFilteredPageClick
                                 }
                                 containerClassName={"pagination"}
                                 pageClassName={"page-item page-item-design"}
                                 pageLinkClassName={
                                    "page-link page-link-design"
                                 }
                                 previousClassName={"page-item"}
                                 previousLinkClassName={"page-link"}
                                 nextClassName={"page-item"}
                                 nextLinkClassName={"page-link"}
                                 breakClassName={"page-item page-item-design"}
                                 breakLinkClassName={
                                    "page-link page-link-design"
                                 }
                                 activeClassName={"active"}
                              />
                           </div>
                        </div>
                     ) : (
                        <div className="container d-flex justify-content-center mt-5">
                           <b> No Blog Avaiable for this Category </b>
                        </div>
                     )}
                  </div>
               )}
            </div>
            <div className="defin_width_of_filtered_side">
               <BlogRenderMoguleButton filterItem={filterItem} />
            </div>
         </div>
      </>
   );
};

export default BlogRenderModule;
