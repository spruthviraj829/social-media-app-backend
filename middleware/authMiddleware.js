import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  //////////////////
    console.log("in the middleware")
  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    next("Authentication== failed");
  }

  const token = authHeader?.split(" ")[1];

  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET);

    req.body.user = {
      userId: userToken.userId,
    };
    /////////////////////
  console.log("leaving middleware")
    next();
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};

export default userAuth;
