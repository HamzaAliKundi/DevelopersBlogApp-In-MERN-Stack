import React from "react";
import { Space, Spin } from "antd";

const Spinner = () => {
   return (
      <>
         <div className="conatiner-fluid d-flex justify-content-center mt-5">
            <Space size="middle">
               <Spin size="large" />{" "}
               <span style={{ fontSize: "25px", fontFamily: "koHo" }}>
                  Loading ...
               </span>
            </Space>
         </div>
      </>
   );
};

export default Spinner;
