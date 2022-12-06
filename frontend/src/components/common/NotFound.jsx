import React from "react";

const NotFound = () => {
   return (
      <>
         <div
            style={{ width: "100%", minHeight: "100vh", fontFamily: "koHo" }}
            className="d-flex justify-content-center align-items-center"
         >
            {" "}
            <h1 className="shadow px-5 rounded-3 py-2">
               Not Found, Error <sub>404</sub>{" "}
            </h1>{" "}
         </div>
      </>
   );
};

export default NotFound;
