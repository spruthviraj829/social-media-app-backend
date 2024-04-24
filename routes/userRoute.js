import express from "express";
import path from "path";
import { acceptRequest, changePassword, friendRequest, getFriendRequest, getUser, profileViews, requestPasswordReset, resetPassword, suggestedFriends, updateUser, verifyEmail } from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";

const viewsPath = path.resolve(new URL('../../view/build', import.meta.url).pathname);



const router = express.Router();
const __dirname = path.resolve(path.dirname(""));
 const htmlResponse = `
      <html>
        <head>
          <title></title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              text-align: center;
             
            }
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
          </style>
        </head>
        <body>
          <h1>Email verified Sucessfully</h1>
          <p>go and login </p>
        </body>
      </html>
    `;

router.get("/verify/:userId/:token", verifyEmail);
router.get("/verified", (req, res) => { res.send(htmlResponse)});

// PASSWORD RESET
router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password", changePassword);


// user routes
router.post("/get-user/:id?", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);

// friend request  
router.post("/friend-request", userAuth, friendRequest);
router.post("/get-friend-request", userAuth, getFriendRequest);

// accept / deny friend request
router.post("/accept-request", userAuth, acceptRequest);

// view profile
router.post("/profile-view", userAuth, profileViews);

//suggested friends
router.post("/suggested-friends", userAuth, suggestedFriends);
  

  router.get("/resetpassword", (req, res) => {
    res.sendFile(path.join(viewsPath, "index.html"));
  });

export default router ;




















// import express from "express";
// import path from "path";
// import { changePassword, requestPasswordReset, resetPassword, verifyEmail } from "../controllers/userController.js";

// const router = express.Router();

// // Define the absolute path to the views directory
// const viewsPath = path.join(process.cwd(), "view", "build");

// // Define the HTML response
// const htmlResponse = `
//   <html>
//     <head>
//       <title></title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           background-color: #f0f0f0;
//           text-align: center;
//         }
//         h1 {
//           color: #333;
//         }
//         p {
//           color: #666;
//         }
//       </style>
//     </head>
//     <body>
//       <h1>Email verified Successfully</h1>
//       <p>Go and login </p>
//     </body>
//   </html>
// `;

// router.get("/verify/:userId/:token", verifyEmail);
// router.get("/verified", (req, res) => { 
//   res.send(htmlResponse);
// });

// // PASSWORD RESET
// router.post("/request-passwordreset", requestPasswordReset);
// router.get("/reset-password/:userId/:token", resetPassword);
// router.post("/reset-password", changePassword);

// // Route to serve the reset password page
// router.get("/resetpassword", (req, res) => {
//   // Send the index.html file from the build directory
//   res.sendFile(path.join(viewsPath, "index.html"));
// });




// export default router;
