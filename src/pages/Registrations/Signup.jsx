/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  /**========================================================================
   *                          User Signup Function
   *========================================================================**/

  const userSignupFunction = async () => {
    // validation
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      // create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // create user Refrence
      const userRefrence = collection(db, "user");

      // Add User Detail
      addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-400 to-blue-900">
      <Card className="h-auto w-80 mx-auto shadow-md">
        {/* Top Heading */}
        <Typography
          variant="h2"
          className="text-center mt-4 bg-gradient-to-br from-blue-700 to-blue-900 bg-clip-text text-transparent"
        >
          Sign Up
        </Typography>

        <CardBody className="flex flex-col gap-4">
          {/* Input One */}
          <Input
            type="text"
            name="name"
            label="Full Name"
            placeholder="John Doe"
            color="blue"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                name: e.target.value,
              });
            }}
            className="mb-4"
          />

          {/* Input Two */}
          <Input
            type="email"
            name="email"
            label="Email Address"
            placeholder="example@example.com"
            color="blue"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                email: e.target.value,
              });
            }}
            className="mb-4"
          />

          {/* Input Three */}
          <Input
            type="password"
            name="password"
            label="Password"
            color="blue"
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                password: e.target.value,
              });
            }}
            className="mb-4"
          />
        </CardBody>

        {/* Signup Button */}
        <CardFooter className="pt-0">
          <Button
            type="button"
            onClick={userSignupFunction}
            color="blue"
            className="flex w-full items-center justify-center font-bold capitalize"
            loading={loading}
          >
            {loading ? "Loading..." : "Signup"}
          </Button>

          <Typography
            variant="small"
            className="mt-6 flex justify-center text-blue-gray-700"
          >
            Have an account?{" "}
            <Link to={"/login"}>
              <Typography
                variant="small"
                className="ml-1 font-bold text-blue-700"
              >
                Login
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
