import React, { useState } from "react";
import { useRef } from "react";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Checkbox, Col, Form } from "antd";
import { FaEllipsisH, FaExclamationTriangle } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";

const RenderLoginUserHomePageBlog = ({
   id,
   author,
   category,
   title,
   subtitle,
   blog,
   deleteBlog,
   createdAt,
   picture,
   description,
}) => {
   const [show, setShow] = useState(false);
   const [visible, setVisible] = useState(false);
   const [confirmLoading, setConfirmLoading] = useState(false);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const target = useRef(null);

   const jwt = localStorage.getItem("token");
   const user = jwtDecode(jwt);
   const userId = user.id;
   const blogCommentUser = blog.user;

   const d = new Date(createdAt);
   let date =
      d.getFullYear() +
      "/" +
      d.getMonth() +
      "/" +
      d.getDay() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes();

   const showDeleteModel = () => {
      setShow(false);
      setVisible(true);
   };

   const showReportModel = () => {
      setIsModalVisible(true);
      setShow(false);
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

   const isHandleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
         setIsModalVisible(false);
         setConfirmLoading(false);
         setShow(false);
      }, 2000);
   };
   const isHandleCancel = () => {
      setIsModalVisible(false);
      setShow(false);
   };

   const onFinish = (values) => {
      console.log("Success:", values);
      setIsModalVisible(false);
      toast.success("Response Submitted");
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   return (
      <>
         {/* ================================================================= Delete Model */}
         <Modal
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            cancelButtonProps={{ style: { width: "100px" } }}
            okButtonProps={{ style: { width: "100px" } }}
            onCancel={handleCancel}
            className="delete_model_design"
            style={{
               fontFamily: "koHo",
               display: "flex justify-content-center",
            }}
         >
            <div style={{ fontSize: "25px" }} className="pt-5 px-5 d-flex">
               <div className="text-warning">
                  <FaExclamationTriangle />{" "}
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
         {/* ================================================================= Report Model */}
         <Modal
            visible={isModalVisible}
            onOk={isHandleOk}
            confirmLoading={confirmLoading}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            onCancel={isHandleCancel}
            className="delete_model_design"
            style={{
               fontFamily: "koHo",
               display: "flex justify-content-center",
            }}
         >
            <div className="py-5 px-5">
               <h3>
                  Report Response{" "}
                  <span className="text-warning">
                     <FaExclamationTriangle />
                  </span>{" "}
               </h3>
               <hr className="my-1 pt-1 rounded-3" />
               <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                  <Form.Item name="checkbox-group">
                     <Checkbox.Group>
                        <Col span={8}>
                           <Checkbox
                              value="Spam"
                              style={{ lineHeight: "32px" }}
                           >
                              <p className="px-2"> Spam </p>
                           </Checkbox>
                        </Col>
                        <Col span={8}>
                           <Checkbox
                              value="Racism"
                              style={{ lineHeight: "32px" }}
                           >
                              <p className="px-2"> Racism </p>
                           </Checkbox>
                        </Col>
                        <Col span={8}>
                           <Checkbox
                              value="Violation"
                              style={{ lineHeight: "32px" }}
                           >
                              <p className="px-2"> Violation </p>
                           </Checkbox>
                        </Col>
                        <Col span={8}>
                           <Checkbox
                              value="Harassment"
                              style={{ lineHeight: "32px" }}
                           >
                              <p className="px-2"> Harassment </p>
                           </Checkbox>
                        </Col>
                        <Col span={8}>
                           <Checkbox
                              value="RulesViolation"
                              style={{ lineHeight: "32px" }}
                           >
                              <p className="px-2">RulesViolation</p>
                           </Checkbox>
                        </Col>
                     </Checkbox.Group>
                  </Form.Item>

                  <Form.Item>
                     <Button
                        className="mt-4 w-100"
                        type="primary"
                        htmlType="submit"
                     >
                        Report Blog
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </Modal>
         <div
            className="main_div_module mt-5 shadow py-3 px-3"
            style={{ width: "700px" }}
         >
            <hr className="bg-danger text-danger py-3" />
            <div className="blog_detail_side">
               <div className="pic_name d-flex align-items-center">
                  <img
                     src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                     className="login_blogger_pic"
                     alt=""
                  />
                  <div className="name">{author} ·</div>
                  <div className="date">
                     {/* {new Date(date).toLocaleString("en-US")} */}
                     {date}
                  </div>
               </div>
               <Link to={`/blogDetail/${id}`}>
                  <h4>{title}</h4>
               </Link>
               <Link to={`/blogDetail/${id}`}>
                  <p style={{ color: "#FFFFFF" }} className="text-dark my-2">
                     {subtitle}
                  </p>
               </Link>

               {category.map((cati, index) => (
                  <button
                     key={index}
                     className="btn mx-2 btn-light w-25 mt-4 category_button_design"
                  >
                     {cati}
                  </button>
               ))}
            </div>
            <div className="d-flex flex-column justify-content-start">
               <div className="d-flex justify-content-end">
                  <div
                     ref={target}
                     onClick={() => setShow(!show)}
                     style={{ cursor: "pointer" }}
                  >
                     <FaEllipsisH />
                  </div>
                  {userId === blogCommentUser ? (
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
                                 onClick={showDeleteModel}
                              >
                                 <div> Delete Blog</div>
                              </Button>

                              <hr className="" />
                              <Link
                                 to={`/writeBlogEdit/${blog._id}`}
                                 className="btn text-light px-2 py-"
                                 title="Edit Blog"
                              >
                                 <button
                                    style={{
                                       color: "white",
                                       backgroundColor: "black",
                                    }}
                                    // to={`/writeBlogEdit/${blog._id}`}
                                 >
                                    <div> Edit Blog </div>
                                 </button>
                              </Link>
                           </Tooltip>
                        )}
                     </Overlay>
                  ) : (
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
                              <button
                                 onClick={showReportModel}
                                 className="btn text-light px-2 py-1"
                              >
                                 Report Blog
                              </button>
                           </Tooltip>
                        )}
                     </Overlay>
                  )}
               </div>
               <div className="d-flex justify-content-end">
                  <Link to={`/blogDetail/${id}`} className="blog_pic_side">
                     <img
                        src={picture}
                        className="middle_deiv_blog_pic"
                        alt=""
                     />
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
};

export default RenderLoginUserHomePageBlog;
