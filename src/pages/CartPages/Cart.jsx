import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { Trash } from "lucide-react";
import { deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router-dom";
import { Card } from "@material-tailwind/react";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };
  const clearCart = () => {
    cartItems.forEach((item) => {
      dispatch(deleteFromCart(item));
    });
  };
  // const cartQuantity = cartItems.length;

  const cartTotal = cartItems
    .map((item) => item.price * 1)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  // user
  const user = JSON.parse(localStorage.getItem("users"));

  // Buy Now Function
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const buyNowFunction = () => {
    // validation
    if (
      addressInfo.name === "" ||
      addressInfo.cardNumber === "" ||
      addressInfo.cvv === "" ||
      addressInfo.expiryDate === ""
    ) {
      return toast.error("All Fields are required");
    }

    // Order Info
    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "pending approval",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    try {
      const orderRef = collection(db, "order");
      addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        cardNumber: "",
        cvv: "",
        expiryDate: "",
      });
      toast.success("Order Placed Successfull");
      clearCart();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-5 mx-auto max-w-7xl px-2 lg:px-0">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Checkout
        </h1>
        <form className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          {/* Cart Items */}
          <section
            aria-labelledby="cart-heading"
            className="col-span-12 lg:col-span-8"
          >
            <h2 id="cart-heading" className="sr-only bg-black">
              Items in your shopping cart
            </h2>
            <div className="flex flex-col gap-6 sm:gap-10">
              {cartItems.length > 0 ? (
                <Card className="rounded-lg shadow-md h-fit p-2">
                  <ul className="divide-y divide-gray-200 gap-10">
                    {cartItems.map((item, index) => (
                      <li key={index} className="flex">
                        <img
                          src={item.eventImageUrl}
                          alt="Product"
                          className="aspect-video w-28 sm:h-38 sm:w-38 rounded-md object-contain object-center"
                        />
                        <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {item.title}
                            </h3>
                          </div>
                          <div className="mt-1 flex items-end">
                            <p className="text-sm font-medium text-gray-900">
                              Rp.{item.price}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteCart(item)}
                          type="button"
                          className="ml-6 flex items-center space-x-1 px-2 py-1 pl-0 text-sm text-red-500 capitalize"
                        >
                          <Trash size={12} />
                          <span className="text-xs font-medium">Remove</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : (
                <h1 className="text-lg font-semibold text-gray-900 py-4 px-6">
                  Not Found
                </h1>
              )}
            </div>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="col-span-12 lg:col-span-4 lg:p-0"
          >
            <Card className="bg-white rounded-md shadow-md">
              <h2
                id="summary-heading"
                className="border-b border-gray-200 px-4 py-3 text-lg font-bold text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <dl className="space-y-1 px-4 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Price</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    Rp. {cartTotal}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-dashed py-4">
                  <dt className="text-base font-medium text-gray-900">
                    Total Amount
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    Rp. {cartTotal}
                  </dd>
                </div>
              </dl>
              <div className="px-4 pb-4">
                {user ? (
                  <>
                    <BuyNowModal
                      addressInfo={addressInfo}
                      setAddressInfo={setAddressInfo}
                      buyNowFunction={buyNowFunction}
                    />
                    {/* <div className="mt-6">
                      <Link
                        to="/Cart"
                        className="block w-full px-4 py-2 text-center bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
                      >
                        Proceed to Checkout
                      </Link>
                    </div> */}
                  </>
                ) : (
                  <Navigate
                    to="/login"
                    className="block w-full px-4 py-2 text-center bg-gray-300 text-gray-600 rounded-md shadow-sm hover:bg-gray-400"
                  >
                    Log in to Checkout
                  </Navigate>
                )}
              </div>
            </Card>
          </section>
        </form>
      </div>
    </Layout>
  );
};

export default CartPage;
