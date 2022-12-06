import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
import { DefaultEditor } from "react-simple-wysiwyg";
import { storage } from "./../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "../css/style.css";

const { Option } = Select;

const WriteBlogAntD = () => {
   const [richTextEditor, setRichTextEditor] = React.useState("");
   const [currentUser, setCurrentUser] = useState({});
   const [imageUplaod, setImageUpload] = useState(null);

   const navigate = useNavigate();

   function onChange(e) {
      setRichTextEditor(e.target.value);
   }

   const onFinish = async (values) => {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      const author = user.name;

      const apiUrl = "http://localhost:5000/api/blog";
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      if (imageUplaod == null) return;
      const imageRef = ref(storage, `images/${imageUplaod.name}`);
      uploadBytes(imageRef, imageUplaod).then((res) => {
         getDownloadURL(imageRef).then((url) => {
            const blogObj = {
               author: author,
               category: values.category,
               title: values.title,
               subtitle: values.subtitle,
               description: richTextEditor,
               image: url,
            };

            try {
               axios.post(apiUrl, blogObj, config).then((res) => {
                  console.log("Response is :/ ", res.data);
                  navigate("/loginPage");
                  toast.success("Blog pushlished Successfully...");
               });
            } catch (ex) {
               console.log("ErrorObj :", ex);
            }
         });
      });
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   useEffect(() => {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setCurrentUser(user);
   }, []);

   return (
      <>
         <div className="write_blog_header pt-4">
            <div className="logo">
               Draft in{" "}
               <span style={{ fontFamily: "koHo", fontSize: "20px" }}>
                  {" "}
                  <b> {currentUser.name}</b>
               </span>
            </div>
            <Link
               to={`/userProfile/${currentUser.id}`}
               title="Profile"
               className="class_1"
            >
               <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  alt=""
                  className="write_page_user_pic"
               />
            </Link>
         </div>
         <div
            className="containor d-flex justify-content-center"
            style={{ width: "100%" }}
         >
            <div
               className="mt-5 shadow-lg d-flex justify-content-center rounded-3 py-3 px-5"
               style={{ width: "900px", border: "1px solid lightgray" }}
            >
               <div>
                  <h5
                     className="d-flex justify-content-center py-4 mb-4"
                     style={{ fontFamily: "koHo" }}
                  >
                     <p
                        className="shadow-lg py-2 px-5 mt-1"
                        style={{
                           borderRadius: "50px",
                           borderBottom: "4px solid lightgray",
                        }}
                     >
                        Create Your Blog for Developers
                     </p>
                  </h5>
                  <Form
                     encType="multipart/form-data"
                     style={{ width: "700px" }}
                     name="basic"
                     initialValues={{
                        remember: true,
                     }}
                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}
                     autoComplete="off"
                  >
                     {/* ================================================================ Select */}
                     <Form.Item
                        name="category"
                        rules={[
                           {
                              required: true,
                              message: "Select Category",
                              type: "array",
                           },
                        ]}
                     >
                        <Select
                           mode="multiple"
                           placeholder="Please Select single or multiple tag"
                        >
                           <Option value="NodeJS" label="NodeJS">
                              <div>Node JS</div>
                           </Option>
                           <Option value="ReactJS" label="ReactJS">
                              <div>React JS</div>
                           </Option>
                           <Option value="MongoDB" label="MongoDB">
                              <div>Mongo DB</div>
                           </Option>
                           <Option value="JavaScript" label="JavaScript">
                              <div>JavaScript</div>
                           </Option>
                           <Option value="PHP" label="PHP">
                              <div>PHP</div>
                           </Option>
                           <Option value="WordPress" label="WordPress">
                              <div>Word Press</div>
                           </Option>
                           <Option value="Express" label="Express">
                              <div>Express JS</div>
                           </Option>
                           <Option value="C++" label="C++">
                              <div>C++</div>
                           </Option>
                           <Option value="Java" label="Java">
                              <div>Java</div>
                           </Option>
                           <Option value="c#" label="c#">
                              <div>c#</div>
                           </Option>
                           <Option value="mysql" label="mysql">
                              <div>mysql</div>
                           </Option>
                           <Option value="MERNStack" label="MERNStack">
                              <div>MERN Stack</div>
                           </Option>
                           <Option value="MEVNStack" label="MEVNStack">
                              <div>MEVN Stack</div>
                           </Option>
                           <Option value="MEANStack" label="MEANStack">
                              <div>MEAN Stack</div>
                           </Option>
                           <Option value="LAMPStack" label="LAMPStack">
                              <div>LAMP Stack</div>
                           </Option>
                           <Option value="DataScience" label="DataScience">
                              <div>Data Science</div>
                           </Option>
                        </Select>
                     </Form.Item>

                     {/* ===================================================================== Title */}
                     <Form.Item
                        name="title"
                        className="shadow mt-4"
                        rules={[
                           {
                              required: true,
                              message: "Please input your title!",
                           },
                        ]}
                     >
                        <Input
                           className="py-1 rounded-3 px-2"
                           placeholder="Title of your Blog"
                        />
                     </Form.Item>

                     {/* ===================================================================== Title */}
                     <Form.Item
                        name="subtitle"
                        className="mt-4 shadow"
                        rules={[
                           {
                              required: true,
                              message: "Please input your subtitle!",
                           },
                        ]}
                     >
                        <Input
                           className="py-1 rounded-3 px-2"
                           placeholder="SubTitle of your Blog"
                        />
                     </Form.Item>

                     {/* ================================================================== Rich Text Editor */}
                     <Form.Item
                        name="description"
                        className="mt-4 shadow rounded-3"
                     >
                        <DefaultEditor
                           value={richTextEditor}
                           onChange={onChange}
                        />
                     </Form.Item>

                     {/* ================================================================= Upload Image */}

                     <Form.Item name="image">
                        <Input
                           type="file"
                           className="mt-4 rounded-3"
                           style={{ cursor: "pointer" }}
                           onChange={(event) => {
                              setImageUpload(event.target.files[0]);
                           }}
                        />
                     </Form.Item>

                     {/* ===================================================================== Submit Button */}
                     <Form.Item className="mt-5 mb-5 shadow">
                        <Button
                           type="dark"
                           style={{
                              backgroundColor: "black",
                              color: "#FFFFFF",
                           }}
                           className="w-100 rounded-3 py-1"
                           htmlType="submit"
                        >
                           Submit
                        </Button>
                     </Form.Item>
                  </Form>
               </div>
            </div>
         </div>
      </>
   );
};

export default WriteBlogAntD;
