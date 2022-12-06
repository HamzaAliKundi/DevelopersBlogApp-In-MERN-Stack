import React, { useState } from "react";
import { useRef } from "react";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

const ProfileBlogsDetail = ({
   author,
   createdAt,
   title,
   subtitle,
   description,
   deleteBlog,
   blog,
   picture,
   category,
}) => {
   const [show, setShow] = useState(false);
   const [visible, setVisible] = useState(false);
   const [confirmLoading, setConfirmLoading] = useState(false);
   const target = useRef(null);

   const showModal = () => {
      setShow(false);
      setVisible(true);
   };

   const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
         setVisible(false);
         setConfirmLoading(false);
         setShow(false);
         deleteBlog(blog);
      }, 2000);
   };

   const handleCancel = () => {
      setVisible(false);
      setShow(false);
   };

   return (
      <>
         <Modal
            // title="Delete Blog"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelButtonProps={{ style: { width: "100px" } }}
            okButtonProps={{ style: { width: "100px" } }}
            className="delete_model_design"
            style={{
               fontFamily: "koHo",
               display: "flex justify-content-center",
            }}
         >
            <div style={{ fontSize: "25px" }} className="pt-5 px-5 d-flex">
               <div className="text-warning">
                  <ExclamationCircleOutlined />{" "}
               </div>
               <b className="mt-1 mx-1"> Do you want to delete this item ? </b>
            </div>
            <div className="px-5 mt-1 mb-5">
               <p>
                  When click the ok button, the dialog will be closed & your
                  Blog will be deleted.
               </p>
            </div>
         </Modal>

         <div
            className="py-5 d-flex justify-content-center "
            style={{ width: "100%", fontFamily: "koHo" }}
         >
            <div className="py-3  d-flex shadow px-5" style={{ width: "75%" }}>
               {/* ======================================================== */}
               <div className="left_side " style={{ width: "70%" }}>
                  <div className="d-flex">
                     <div className="pic">
                        <img
                           src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                           alt=""
                           style={{ width: "50px", borderRadius: "40px" }}
                        />
                     </div>
                     <div className="name+date mx-3">
                        <div className="name">{author}</div>
                        <div className="date">
                           {new Date(createdAt).toLocaleString("en-US")}
                        </div>
                     </div>
                  </div>
                  <div className="title mt-3">
                     <h1>{title}</h1>
                  </div>
                  <div className="subtitle mt-2">
                     <h5 style={{ color: " lightgray" }}>{subtitle}</h5>
                  </div>
                  <div className="tags mt-5">
                     {category.map((cati, index) => (
                        <button
                           key={index}
                           className="btn btn-light px-5 py-1 mx-1"
                           style={{
                              borderRadius: "20px",
                              border: "1px solid lightgray",
                           }}
                        >
                           {cati}
                        </button>
                     ))}
                  </div>
               </div>
               {/* ======================================================== */}
               <div
                  className="right_side d-flex align-items-center flex-column justify-content-center"
                  style={{ width: "30%" }}
               >
                  <div
                     ref={target}
                     onClick={() => setShow(!show)}
                     style={{ cursor: "pointer" }}
                  >
                     <FaEllipsisH />
                  </div>
                  <div className="d-flex mb-5 justify-content-end py-3 px-5 mx-5 w-100 ">
                     <Overlay
                        target={target.current}
                        show={show}
                        placement="right"
                     >
                        {(props) => (
                           <Tooltip
                              id="overlay-example"
                              {...props}
                              className="px-2"
                           >
                              <Button
                                 style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    border: "none",
                                 }}
                                 className="px-4"
                                 onClick={showModal}
                              >
                                 <div> Delete Blog</div>
                              </Button>

                              <hr className="" />
                              <Button
                                 style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    border: "none",
                                 }}
                                 className="px-4"
                                 title="Edit Comment"
                              >
                                 <Link to={`/writeBlogEdit/${blog._id}`}>
                                    Edit Blog
                                 </Link>
                              </Button>
                           </Tooltip>
                        )}
                     </Overlay>
                  </div>
                  <div className="image">
                     <img
                        src={picture}
                        alt=""
                        className="rounded-3"
                        style={{ width: "200px" }}
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ProfileBlogsDetail;
