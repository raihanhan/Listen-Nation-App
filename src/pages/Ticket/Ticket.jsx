import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import myContext from "../../context/myContext";
import { useContext } from "react";
import { Card, Typography, CardBody, Button,Spinner } from "@material-tailwind/react";
import { SlCalender } from "react-icons/sl";
import { FaMoneyBill } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

const Ticket = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;
    const navigate = useNavigate();
    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <Spinner color="blue" className="h-16 w-16" />
          </div>
        );
      }
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center mt-10">
                <Typography variant="h4" className="w-full text-center mt-4">
                    Your Tickets
                </Typography>
                {/* Heading */}
                {/* main */}
                <section className="flex flex-wrap gap-4 mt-4 max-w-5xl">
                    {getAllOrder
                        .filter((obj) => obj.userid === user?.uid && obj.status !== "pending approval" && obj.status !== "rejected")
                        .map((order, orderIndex) => (
                            order.cartItems.map((item, itemIndex) => {
                                const { id, title, price, eventImageUrl ,start, startTime} = item;
                                return (
                                    <Card
                                        key={`${orderIndex}-${itemIndex}`}
                                        className="h-[340px] w-[200px] border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer"
                                    >
                                        <img
                                            className="h-48 md:h-64 lg:h-72 w-full object-cover"
                                            src={eventImageUrl}
                                            alt="Event"
                                        />
                                        <CardBody className="p-4">
                                        <Typography variant="h6" color="gray" className="mb-3">
                                            {title.substring(0, 25)}
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
                                            <div className="flex justify-center">
                                                <Button
                                                    onClick={() => navigate(`/LivePage/${id}`)}
                                                    color="red"
                                                    className="w-full py-2 rounded-lg font-bold capitalize"
                                                >
                                                    Watch
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                );
                            })
                        ))}
                </section>
                
            </div>
        </Layout>
    );
};

export default Ticket;
