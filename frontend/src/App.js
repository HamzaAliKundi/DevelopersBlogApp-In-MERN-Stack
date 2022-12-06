import React from "react";
import { gapi } from "gapi-script";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Logout from "./components/common/Logout";
import NotFound from "./components/common/NotFound";
import LoginUserPage from "./components/LoginUserPage";
import WriteBlogAntD from "./components/WriteBlogAntD";
import PostedBlogDetail from "./components/PostedBlogDetail";
import SignleBlogDetail from "./components/SignleBlogDetail";
import WriteBlogAntDEdit from "./components/WriteBlogAntDEdit";
import CurrentUserProfile from "./components/common/CurrentUserProfile";
import "react-toastify/dist/ReactToastify.css";

function App() {
   gapi.load("client:auth2", () => {
      gapi.client.init({
         clientId: "*****.apps.googleusercontent.com",
         plugin_name: "chat",
      });
   });

   return (
      <React.Fragment>
         <ToastContainer />
         <Router>
            <Routes>
               <Route
                  path="/writeBlogEdit/:id"
                  element={<WriteBlogAntDEdit />}
               />
               <Route
                  path="/userProfile/:id"
                  element={<CurrentUserProfile />}
               />
               <Route path="/blogDetail/:id" element={<SignleBlogDetail />} />
               <Route path="/postedBlog" element={<PostedBlogDetail />} />
               <Route path="/loginPage" element={<LoginUserPage />} />
               <Route path="/writeBlog" element={<WriteBlogAntD />} />
               <Route path="/logout" element={<Logout />} />
               <Route path="/" element={<Home />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </Router>
      </React.Fragment>
   );
}

export default App;
