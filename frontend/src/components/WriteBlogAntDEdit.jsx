import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Button, Form, Input, Upload, Select } from "antd";
import jwtDecode from "jwt-decode";
import axios from "axios";

const { Option } = Select;

const WriteBlogAntDEdit = () => {
   const [richTextEditor, setRichTextEditor] = useState("");
   const [title, setTtitle] = useState("");
   const [subtitle, setSubtitle] = useState("");
   const [category, setCategory] = useState([]);
   const [currentUser, setCurrentUser] = useState({});
   const [imageUpload, setImageUpload] = useState("");
   const [image] = useState("");

   const param = useParams();
   const blogId = param.id;

   function onChange(e) {
      setRichTextEditor(e.target.value);
   }

   const onFinish = async (values) => {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      const author = user.name;

      const apiUrl = `http://localhost:5000/api/blog/${blogId}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: { Authorization: `Bearer ${token}` },
      };

      const blogObj = {
         author: author,
         category: category,
         title: title,
         subtitle: subtitle,
         description: richTextEditor,
         image: image,
      };

      try {
         await axios.put(apiUrl, blogObj, config).then((res) => {
            toast.success("Blog Updated Successfully...");
         });
      } catch (ex) {
         console.log("ErrorObj :", ex);
      }
   };

   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   useEffect(() => {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setCurrentUser(user);
   }, []);

   useEffect(() => {
      const getSingleBlogForEdit = async () => {
         const apiUrl = `http://localhost:5000/api/blog/${blogId}`;
         const token = localStorage.getItem("token");
         const config = {
            headers: { Authorization: `Bearer ${token}` },
         };

         await axios
            .get(apiUrl, config)
            .then((res) => {
               console.log("Response is : Edit Blog => ", res.data);
               setTtitle(res.data.title);
               setSubtitle(res.data.subtitle);
               setCategory(res.data.category);
               setRichTextEditor(res.data.description);
               setImageUpload(res.data.image);
            })
            .catch((ex) => {
               console.log("ex :", ex);
            });
      };

      getSingleBlogForEdit();
   }, [blogId]);

   return (
      <>
         <div className="write_blog_header pt-4">
            <div className="logo">
               Draft in <b> {currentUser.name}</b>
            </div>
            <Link to="/loginPage" className="class_1">
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
                        Update Your Blog
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
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                           placeholder="Please Select Category"
                        >
                           <Option value="NodeJS">
                              <div className="">NodeJS</div>
                           </Option>
                           <Option value="ReactJS" label="ReactJS">
                              <div>ReactJS</div>
                           </Option>
                           <Option value="MongoDB" label="MongoDB">
                              <div>MongoDB</div>
                           </Option>
                           <Option value="Express" label="Express">
                              <div>Express</div>
                           </Option>
                           <Option value="MERNStack" label="MERNStack">
                              <div>MERNStack</div>
                           </Option>
                           <Option value="MEvNStack" label="MEvNStack">
                              <div>MEvNStack</div>
                           </Option>
                           <Option value="MEaNStack" label="MEaNStack">
                              <div>MEaNStack</div>
                           </Option>
                           <Option value="LAMPStack" label="LAMPStack">
                              <div>LAMPStack</div>
                           </Option>
                           <Option value="Data Science" label="DataScience">
                              <div>Data Science</div>
                           </Option>
                        </Select>
                     </Form.Item>

                     {/* ===================================================================== Title */}
                     <Form.Item
                        name="title"
                        onChange={(e) => setTtitle(e.target.value)}
                        value={title}
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
                        onChange={(e) => setSubtitle(e.target.value)}
                        value={subtitle}
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
                        <Upload>
                           <Button
                              className="mt-4 shadow rounded-3 px-5"
                              icon={<UploadOutlined />}
                           >
                              Click to Upload
                           </Button>
                        </Upload>
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
                           Update Blog
                        </Button>
                     </Form.Item>
                  </Form>
               </div>
            </div>
         </div>
      </>
   );
};

export default WriteBlogAntDEdit;
