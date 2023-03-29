const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const { verifyToken,genrateToken } = require("../auth/auth");




const SignUp = async(req, res) => {
  try {
    let { name, email, password } = req.body;
    console.log(password);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    password = hashedPassword
    const user_details = await userService.SignUp({ name, email, password })
    console.log(user_details);
    if(user_details.statusCode) return res.json({status:false,message:'Internal server error'})
    if(user_details.nativeError?.errno) return res.json({status:false,message:"This user Email exists"})
    return res.json({status:false,message:"user register successfully",user:user_details})
  } catch (error) {
    console.log(error);
    return res.json({status:false,message:"Internal server error"})
  }

  // console.log(user_details);
  // userService.SignUp({ name, email, password }).then((result) => {
  //   return res.json({ status: true, data: result });
  // }).catch((error) => {
  //   console.log(error,'error11111111111111111111111111111111111111111');
  //   // if (error.nativeError?.errno == 1062 ) {
  //   //   return res.json({ status: false, message: "Email already exists." });
  //   // } 
  //   return res.json({ status: false, message: "Internal server error." });
  // })
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user_details = await userService.GetUserByEmail({ email, password });
     if (user_details) {
       const passwordMatch = await bcrypt.compare(
         password,
         user_details.password
       );
       if (passwordMatch) {
         const token = genrateToken(user_details);
         console.log(token);
         return res.json({
           code: 200,
           message: "Login Successfully...",
           user: user_details,
           token: token,
         });
      }else{
        return res.send({ status: false, message: "Invalid email or password" });
       }
    }else{
      return res.json({ status: false, message: "This user email dons't exists" });
    }
  } catch (error) {
    return res.json({status:false,message:"Internal server error"})
  }
};


// const getUser = async (req, res) => {
//   const token = req.headers.authorization
//   console.log(token, 'token...');
//   const result = await verifyToken(token);
//   if (result) {
//     return res.json({
//       status: true,
//       message: "User verified...",
//       user: result.user,
//       accessToken: result.token,
//     });
//   }
//   res.cookie("token", result.token).send(result);
// };

module.exports = { SignUp, Login };