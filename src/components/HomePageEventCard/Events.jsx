import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { Card, CardBody, Button, Typography,Spinner } from "@material-tailwind/react";
import { SlCalender } from "react-icons/sl";
import { FaMoneyBill } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

const HomePageEventCard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
 
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("add to cart");
  };
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="blue" className="h-16 w-16" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-10">
      {/* Heading */}
      <Typography variant="h4" className="w-full text-center">
        Events
      </Typography>
      {/* Main */}
      <section className="flex flex-wrap flex-grow gap-4 mt-4 max-w-5xl">
  {getAllProduct.slice(0, 8).map((item, index) => {
    const { id, title, price, eventImageUrl, start, startTime } = item;
    return (
      <Card
        key={index}
        className="w-[200px] min-h-[340px] flex flex-col border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer"
      >
        <img
          className="h-48 md:h-64 lg:h-72 w-full object-cover"
          onClick={() => navigate(`/EventDetail/${id}`)}
          src={eventImageUrl}
          alt="Event"
        />
        <CardBody className="p-4 flex flex-col justify-between flex-grow">
          <div className="flex-grow">
            <Typography variant="h6" color="gray" className="mb-3 truncate">
              {title.substring(0, 25)}{title.length > 25 ? '...' : ''}
            </Typography>
            <div className="flex items-center mb-3 space-x-2">
              <FaMoneyBill />
              <Typography variant="h6" color="gray">
                Rp.{price}
              </Typography>
            </div>
            <div className="flex items-center mb-3 space-x-2">
              <SlCalender />
              <Typography variant="h6" color="gray">
                {start}
              </Typography>
            </div>
            <div className="flex items-center mb-3 space-x-2">
              <FaClock />
              <Typography variant="h6" color="gray">
                {startTime}
              </Typography>
            </div>
          </div>
          {user && (
            <div className="mt-auto">
              {cartItems.some((p) => p.id === item.id) ? (
                <Button
                  onClick={() => deleteCart(item)}
                  color="red"
                  className="w-full py-2 rounded-lg font-bold capitalize"
                >
                  Delete
                </Button>
              ) : (
                <Button
                  onClick={() => addCart(item)}
                  color="blue"
                  className="w-full py-2 rounded-lg font-bold capitalize"
                >
                  Add To Cart
                </Button>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    );
  })}
</section>
    </div>
  );
};

export default HomePageEventCard;
