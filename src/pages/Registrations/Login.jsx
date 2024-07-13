/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  /**========================================================================
   *                          User Login Function
   *========================================================================**/

  const userLoginFunction = async () => {
    // validation
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      // console.log(users.user)

      try {
        const q = query(
          collection(db, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully");
          setLoading(false);
          if (user.role === "user") {
            navigate("/");
          } else {
            navigate("/admin-dashboard");
          }
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center  bg-gradient-to-br from-blue-400 to-blue-900">
      <Card className="h-auto w-80 mx-auto shadow-md">
        {/* Login Form  */}
        {/* Top Heading  */}
        <Typography
          variant="h2"
          className="text-center mt-4 bg-gradient-to-br from-blue-700 to-blue-900 bg-clip-text text-transparent"
        >
          Sign In
        </Typography>

        <CardBody className="flex flex-col gap-4">
          {/* Input One  */}
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="example@example.com"
            color="blue"
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                email: e.target.value,
              });
            }}
            className="mb-4"
          />

          {/* Input Two  */}
          <Input
            type="password"
            name="password"
            label="Password"
            color="blue"
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                password: e.target.value,
              });
            }}
            className="mb-4"
          />
          <div className="-ml-2.5">
            <Checkbox color="blue" label="Remember Me" />
          </div>
        </CardBody>

        {/* Signup Button  */}
        <CardFooter className="pt-0">
          <Button
            type="button"
            onClick={userLoginFunction}
            color="blue"
            className="flex w-full items-center justify-center font-bold capitalize"
            loading={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>

          <Typography
            variant="small"
            className="mt-6 flex justify-center text-blue-gray-700"
          >
            Don&apos;t have an account?{" "}
            <Link to={"/signup"}>
              <Typography
                variant="small"
                className="ml-1 font-bold text-blue-700"
              >
                Signup
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
