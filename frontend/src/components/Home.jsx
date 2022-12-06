import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./common/Header";
import Navbar from "./common/Navbar";
import SearchInput from "./common/SearchInput";
import RenderHomePageBlogs from "./common/RenderHomePageBlogs";
import RenderHomePageFilters from "./common/RenderHomePageFilters";
import axios from "axios";
import Spinner from "./common/Spinner";
import ReactPaginate from "react-paginate";
import ".././css/style.css";

const Home = () => {
   const navigate = useNavigate();

   const token = localStorage.getItem("token");
   useEffect(() => {
      if (!token) {
         navigate("/");
      } else {
         navigate("/loginPage");
      }
   }, [token, navigate]);

   const [homePageBlogs, setHomePageBlogs] = useState([]);
   const [allBlogs, setAllBlogs] = useState([]);
   const [pageCount, setPageCount] = useState(0);
   const [currentPage] = useState(0);
   const [searchResults, setSearchResults] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const [paginate, setPaginate] = useState(true);

   useEffect(() => {
      const FetchHomePageBlogs = async () => {
         setIsLoading(true);
         fetch(`http://localhost:5000/api/blog?page=${currentPage}`)
            .then((response) => response.json())
            .then(({ totalPages, blog }) => {
               setHomePageBlogs(blog);
               setAllBlogs(blog);
               setPageCount(totalPages);
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
            setPageCount(totalPagesItems);
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

   const searchHandler = (searchTerm) => {
      setSearchTerm(searchTerm);

      if (searchTerm !== "") {
         const newPageBlogs = allBlogs.filter((blog) => {
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

   return (
      <div>
         <Navbar />
         <Header />
         {/* ============================================================================================== Render Blogs */}
         {isLoading ? (
            <Spinner />
         ) : (
            <div className="home_page_render_blog">
               <div className="blog_detail_side">
                  <SearchInput
                     term={searchTerm}
                     searchKeyWord={searchHandler}
                  />
                  {homePageBlogs.length > 0 ? (
                     <div className="div">
                        <div>
                           {searchTerm.length < 1
                              ? homePageBlogs.map((blog) => (
                                   <RenderHomePageBlogs
                                      key={blog._id}
                                      id={blog._id}
                                      noOfBlogs={homePageBlogs}
                                      author={blog.author}
                                      category={blog.category}
                                      title={blog.title}
                                      subtitle={blog.subtitle}
                                      description={blog.description}
                                      createdAt={blog.createdAt}
                                      picture={blog.image}
                                   />
                                ))
                              : searchResults.map((blog) => (
                                   <RenderHomePageBlogs
                                      key={blog._id}
                                      id={blog._id}
                                      author={blog.author}
                                      noOfBlogs={searchResults}
                                      category={blog.category}
                                      title={blog.title}
                                      subtitle={blog.subtitle}
                                      description={blog.description}
                                      createdAt={blog.createdAt}
                                      picture={blog.image}
                                   />
                                ))}
                        </div>
                        <div className="my-5 mx-4" style={{ fontSize: "25px" }}>
                           <ReactPaginate
                              previousLabel={"< Previous"}
                              nextLabel={"Next >"}
                              breakLabel={"..."}
                              pageCount={pageCount}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={3}
                              onPageChange={
                                 paginate
                                    ? handlePageClick
                                    : handleFilteredPageClick
                              }
                              containerClassName={"pagination"}
                              pageClassName={"page-item page-item-design"}
                              pageLinkClassName={"page-link page-link-design"}
                              previousClassName={"page-item"}
                              previousLinkClassName={"page-link"}
                              nextClassName={"page-item"}
                              nextLinkClassName={"page-link"}
                              breakClassName={"page-item page-item-design"}
                              breakLinkClassName={"page-link page-link-design"}
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

               <div
                  className="filter_detail"
                  style={{
                     position: "sticky",
                     top: "4rem",
                     fontFamily: "koHo",
                  }}
               >
                  <RenderHomePageFilters filterItem={filterItem} />
               </div>
            </div>
         )}
      </div>
   );
};

export default Home;
