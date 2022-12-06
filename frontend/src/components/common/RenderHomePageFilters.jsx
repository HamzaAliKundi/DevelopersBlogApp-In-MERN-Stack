import React from "react";
import { FaInstagram, FaRegEnvelope, FaWhatsapp } from "react-icons/fa";
import "../../css/style.css";

const RenderHomePageFilters = ({ filterItem }) => {
   return (
      <>
         <div className="d-flex flex-column justify-content-between">
            <div className="buttons mb-5">
               <b style={{ fontFamily: "koHo" }} className="mb-5">
                  DISCOVER MORE OF WHAT MATTERS TO YOU
               </b>
               <br />
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("allBlogs")}
               >
                  All Blogs
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("NodeJS")}
               >
                  NodeJS
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("ReactJS")}
               >
                  ReactJS
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("MongoDB")}
               >
                  MongoDB
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("JavaScript")}
               >
                  Java Script
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("PHP")}
               >
                  PHP
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("WordPress")}
               >
                  Wor dPress
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("Express")}
               >
                  Express JS
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("Python")}
               >
                  Python
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("C++")}
               >
                  C++
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("Java")}
               >
                  Java
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("c#")}
               >
                  C#
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("mysql")}
               >
                  mysql
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("MERNStack")}
               >
                  MERN Stack
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("MEVNStack")}
               >
                  MEVN Stack
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("MEANStack")}
               >
                  MEAN Stack
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("LAMPStack")}
               >
                  LAMP Stack
               </button>
               <button
                  className="btn btn-primary px-4 py-1 mt-4 mx-2 active"
                  style={{
                     border: "1px solid lightgray",
                     borderRadius: "20px",
                  }}
                  onClick={() => filterItem("DataScience")}
               >
                  Data Science
               </button>
            </div>
            <div className="icons mt-2">
               <p style={{ fontSize: "20px" }}>contact </p>
               <hr className="mt-1 mb-3 pt-1 rounded-3" />
               <div className="">
                  <div>
                     <FaInstagram
                        className="text-dark"
                        style={{ fontSize: "30px" }}
                        title="Instagram"
                     />
                     <span>
                        {" "}
                        Username: <b>hamza_ali_kundi</b>{" "}
                     </span>
                  </div>
                  <div>
                     <FaWhatsapp
                        className="text-dark mt-1"
                        style={{ fontSize: "30px" }}
                        title="Whatsapp"
                     />
                     <span>
                        {" "}
                        Number: <b>+92 304 9068858</b>{" "}
                     </span>
                  </div>
                  <div>
                     <FaRegEnvelope
                        className="text-dark mt-1"
                        style={{ fontSize: "30px" }}
                        title="Email"
                     />
                     <span>
                        {" "}
                        Email: <b>hamza.alee83@gmail.com</b>{" "}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default RenderHomePageFilters;
