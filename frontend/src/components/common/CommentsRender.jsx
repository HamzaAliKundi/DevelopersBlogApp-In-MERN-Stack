import React, { useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { FaEllipsisH, FaExclamationTriangle } from "react-icons/fa";
import { Checkbox, Col, Form, Button, Modal } from "antd";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import jwtDecode from "jwt-decode";

const CommentsRender = ({
   author,
   comment,
   createdAt,
   blogComment,
   deleteComment,
   getSingleCommentObj,
}) => {
   const [show, setShow] = useState(false);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [visible, setVisible] = useState(false);
   const [confirmLoading, setConfirmLoading] = useState(false);
   const target = useRef(null);

   // ======================================= Checking the user if its the author of the comment or not if yes ? show "Delete & Edit" : "Report"
   // debugger;
   let userId = -1;
   const jwt = localStorage.getItem("token");
   if (jwt) {
      const user = jwtDecode(jwt);
      userId = user.id;
   }
   const blogCommentUser = blogComment.user;

   const showModal = () => {
      setIsModalVisible(true);
      setShow(false);
   };

   const isHandleOk = () => {
      setIsModalVisible(false);
      setShow(false);
   };

   const isHandleCancel = () => {
      setIsModalVisible(false);
      setShow(false);
   };

   const onFinish = (values) => {
      console.log("Success:", values);
      setIsModalVisible(false);
      setShow(false);
      toast.success("Response Submitted");
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
      setShow(false);
   };

   const showDeleteModal = () => {
      setShow(false);
      setVisible(true);
   };

   const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
         setVisible(false);
         setConfirmLoading(false);
         setShow(false);
         deleteComment(blogComment);
      }, 2000);
   };

   const handleCancel = () => {
      setVisible(false);
      setShow(false);
   };

   const handleHideTooltip = () => {
      setShow(false);
   };

   return (
      <>
         {/* ================================================================= Delete Model */}
         <Modal
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
            <div style={{ fontSize: "23px" }} className="pt-5 px-5 d-flex">
               <div className="text-warning">
                  <FaExclamationTriangle />{" "}
               </div>
               <b className="mt-1 mx-1">
                  {" "}
                  Do you want to delete this comment ?{" "}
               </b>
            </div>
            <div className="px-5 mt-1 mb-5">
               <p>
                  When click the ok button, the dialog will be closed & your
                  Comment will be deleted.
               </p>
            </div>
         </Modal>
         {/* ========================================================================== Report Model */}
         <Modal
            title=""
            visible={isModalVisible}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            onOk={isHandleOk}
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
                        Report Comment
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </Modal>{" "}
         <hr className="mt-4 w-100 shadow" />
         <div className="mt-5" style={{ width: "450px" }}>
            <div className="d-flex justify-content-between align-items-md-cente ">
               <div className="d-flex">
                  <div className="image">
                     <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        alt=""
                        style={{
                           width: "60px",
                           height: "60px",
                           borderRadius: "60px",
                        }}
                     />
                  </div>
                  <div className="name+date mt-2 mx-2">
                     <div className="name ">{author}</div>
                     <div className="date">
                        {new Date(createdAt).toLocaleString("en-US")}
                     </div>
                  </div>
               </div>
               <div>
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
                              <button
                                 className="btn text-light px-2 py-1"
                                 onClick={showDeleteModal}
                                 title="Delete Comment"
                              >
                                 Delete Comment
                              </button>
                              <hr className="" />
                              <button
                                 className="btn text-light px-2 py-1"
                                 title="Edit Comment"
                                 onClick={() =>
                                    getSingleCommentObj(blogComment)
                                 }
                              >
                                 <div onClick={handleHideTooltip}>
                                    Edit Comment
                                 </div>
                              </button>
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
                                 onClick={showModal}
                                 className="btn text-light px-2 py-1"
                              >
                                 Report Comment
                              </button>
                           </Tooltip>
                        )}
                     </Overlay>
                  )}
               </div>
            </div>
            <div className="comment">
               <p className="mt-4">{comment}</p>
               <hr className="mt-2 pt-1 rounded-3" />
            </div>
         </div>
      </>
   );
};

export default CommentsRender;
