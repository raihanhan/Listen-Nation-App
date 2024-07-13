import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Typography,
  IconButton,
  Navbar,
  Collapse,
  Badge,
} from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";

const NavbarComponent = () => {
  const [openNav, setOpenNav] = useState(false);
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart);
  const isActive = (path) =>
    location.pathname === path ? "bg-blue-700 text-white" : "bg-transparent";
  const Logout = () => {
    localStorage.clear("users");
    navigate("/");
  };

  const navList = (
    <ul className="flex flex-col lg:flex-row gap-1 lg:gap-5 w-full items-center">
      <Link to="/">
        <li
          className={`px-3 py-2 text-black rounded-lg hover:bg-blue-700 hover:text-white ${isActive(
            "/"
          )}`}
        >
          Home
        </li>
      </Link>
      <Link to="/EventsPage">
        <li
          className={`px-3 py-2 text-black rounded-lg hover:bg-blue-700 hover:text-white ${isActive(
            "/EventsPage"
          )}`}
        >
          Events
        </li>
      </Link>
      {/* <Link to="/ArchivesPage">
        <li
          className={`px-3 py-2 text-black rounded-lg hover:bg-blue-700 hover:text-white ${isActive(
            "/ArchivesPage"
          )}`}
        >
          Archives
        </li>
      </Link> */}
      {user?.role === "user" && (
        <Link to="/Ticket">
          <li
            className={`px-3 py-2 text-black rounded-lg hover:bg-blue-700 hover:text-white ${isActive(
              "/Ticket"
            )}`}
          >
            Ticket
          </li>
        </Link>
      )}
      {user?.role === "user" && (
        <Badge color="red" content={cartItems.length} className="mr-2">
          <Link to="/Cart">
            <li
              className={`px-3 py-2 text-black rounded-lg hover:bg-blue-700 hover:text-white ${isActive(
                "/Cart"
              )}`}
            >
              <MdOutlineShoppingCart className="text-xl" />
            </li>
          </Link>
        </Badge>
      )}
      {user?.role === "user" && (
        <Link to="/user-dashboard">
          <li
            className={`px-3 py-2 text-black rounded-lg hover:bg-blue-700 hover:text-white ${isActive(
              "/user-dashboard"
            )}`}
          >
            {user?.name}
          </li>
        </Link>
      )}
      {user?.role === "admin" && (
        <Link to="/admin-dashboard">
          <li
            className={`px-3 py-2 text-black rounded-lg hover:bg-blue-700 hover:text-white ${isActive(
              "/admin-dashboard"
            )}`}
          >
            {user?.name}
          </li>
        </Link>
      )}
      {user && (
        <li
          className="cursor-pointer px-3 py-2 text-white rounded-lg hover:bg-red-700 bg-red-500"
          onClick={Logout}
        >
          Logout
        </li>
      )}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 text-3xl md:text-2xl cursor-pointer font-bold  from-blue-700 to-blue-900 bg-clip-text text-transparent bg-gradient-to-r"
        >
          Listen Nation
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {!user && (
              <>
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block capitalize"
                >
                  <Link to="/login">
                    <span>Log In</span>
                  </Link>
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block capitalize"
                >
                  <Link to="/signup">
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <CiMenuFries className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1 mt-4">
          {!user && (
            <>
              <Button fullWidth variant="text" size="sm">
                <Link to="/login">
                  <span>Log In</span>
                </Link>
              </Button>
              <Button fullWidth variant="gradient" size="sm">
                <Link to="/signup">
                  <span>Sign Up</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
