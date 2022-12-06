const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
   "340636402788-k287jmsa8kbmuhb3gi3ifdtg054vfu6l.apps.googleusercontent.com"
);

// =============================================================================== **Register a New User**
const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fileds");
   }

   const userExists = await User.findOne({ email });

   if (userExists) {
      res.status(400);
      throw new Error("User alredy register");
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const user = User.create({
      name: name,
      email: email,
      password: hashedPassword,
   });

   if (user) {
      res.status(201).json({
         _id: user.id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id, user.name, user.email),
      });
   } else {
      res.status(400);
      throw new Error("Invalid user Data");
   }
});

// =============================================================================== **Login User With Email**
const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
         _id: user.id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id, user.name, user.email),
      });
   } else {
      res.status(400);
      throw new Error("Invalid user data");
   }
});

// =============================================================================== **Login With Google**
const googleLogin = asyncHandler((req, res) => {
   const { tokenId } = req.body;

   client
      .verifyIdToken({
         idToken: tokenId,
         audience:
            "340636402788-k287jmsa8kbmuhb3gi3ifdtg054vfu6l.apps.googleusercontent.com",
      })
      .then((response) => {
         const { email_verified, name, email } = response.payload;

         if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
               if (err) {
                  return res.status(400).json({
                     error: "Something went wrong ...",
                  });
               } else {
                  if (user) {
                     const token = jwt.sign(
                        { id: user._id, name: user.name, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: "30d" }
                     );

                     const { _id, name, email } = user;

                     return res.status(200).json({
                        token,
                        user: { _id, name, email },
                     });
                  } else {
                     let password = email + process.env.JWT_SECRET;

                     let newUser = new User({ name, email, password });

                     newUser.save((err, data) => {
                        if (err) {
                           return res.status(400).json({
                              error: "Something went wrong ...",
                           });
                        } else {
                           const token = jwt.sign(
                              {
                                 id: data._id,
                                 name: data.name,
                                 email: data.email,
                              },
                              process.env.JWT_SECRET,
                              { expiresIn: "30d" }
                           );

                           const { _id, name, email } = newUser;

                           return res.status(200).json({
                              token,
                              user: { _id, name, email },
                           });
                        }
                     });
                  }
               }
            });
         }
      });
});

// =============================================================================== **Generating a Token**
const generateToken = (id, name, email) => {
   return jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
   });
};

module.exports = {
   registerUser,
   loginUser,
   googleLogin,
   // activateAccount,
};

// const mailgun = require("mailgun-js");
// const DOMAIN = "sandbox76e74114a87b41eea065406202bd20e7.mailgun.org";
// const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

// const registerUser = asyncHandler(async (req, res) => {
//    const { name, email, password } = req.body;

//    if (!name || !email || !password) {
//       res.status(400);
//       throw new Error("Please add all fileds");
//    }

//    const token = jwt.sign(
//       { name, email, password },
//       process.env.JWT_ACC_ACTIVATE,
//       { expiresIn: "20m" }
//    );

//    const data = {
//       from: "DevelopersBlog@dev.com",
//       to: email,
//       subject: "Account Activation Link",
//       html: `
//          <h1>Email Verification Link </h1>
//          <br />
//          <Link>${process.env.CLIENT_URL}/authencation/activate/${token}</Link>
//       `,
//    };
//    mg.messages().send(data, function (error, body) {
//       if (error) {
//          return res.json({
//             error: error.message,
//          });
//       } else {
//          return res.json({
//             message: "Email has been sent, kindly activate your account",
//          });
//       }
//    });
// });

// const activateAccount = asyncHandler(async (req, res) => {
//    const { token } = req.body;

//    if (token) {
//       jwt.verify(
//          token,
//          process.env.JWT_ACC_ACTIVATE,
//          function (err, decodedToken) {
//             if (err) {
//                return res
//                   .status(400)
//                   .json({ error: "Incorrect or expired link" });
//             } else {
//                const { name, email, password } = decodedToken;
//                User.findOne({ email }).exec((err, user) => {
//                   if (user) {
//                      return res
//                         .status(400)
//                         .json({ error: "User with this email already exists" });
//                   } else {
//                      let newUser = new User({ name, email, password });
//                      newUser.save((err, success) => {
//                         if (err) {
//                            console.log(
//                               "Error in signup while account activation : ",
//                               err
//                            );
//                            return res
//                               .status(400)
//                               .json({ error: "Error activationg account" });
//                         } else {
//                            return res.json({
//                               message: "SignUp Success",
//                            });
//                         }
//                      });
//                   }
//                });
//             }
//          }
//       );
//    } else {
//       return res.json({ error: "Something went wrong" });
//    }
// });
