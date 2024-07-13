import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";


const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    // navigate 
    const navigate = useNavigate();
    const { id } = useParams()
    console.log(id)

    // event state
    const [event, setEvent] = useState({
        idEvent: "",
        title: "",
        price: "",
        eventImageUrl: "",
        description: "",
        liveUrl:"",
        start:"",
        startTime:"",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    // Get Single event Function
    const getSingleEventFunction = async () => {
        setLoading(true);
        try {
            const eventTemp = await getDoc(doc(db, "events", id))
            //   console.log(event.data())
            const event = eventTemp.data();
            setEvent({
                idEvent:        event?.idEvent,
                title:          event?.title,
                price:          event?.price,
                eventImageUrl:  event?.eventImageUrl,
                liveUrl:        event?.liveUrl,
                start:          event?.start,
                startTime:      event?.startTime,
                description:    event?.description,
                time:           event?.time,
                date:           event?.date
            })
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const UpdateEvent = async () => {
        setLoading(true)
        try {

            await setDoc(doc(db, 'events', id), event)
            toast.success("event Updated successfully")
            getAllProductFunction();
            setLoading(false)
            navigate('/admin-dashboard')

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getSingleEventFunction();
    }, []);
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                {/* Login Form  */}
                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500 '>
                            Update event
                        </h2>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="idEvent"
                            value={event.idEvent}
                            onChange={(e) => {
                                setEvent({
                                    ...event,
                                    idEvent: e.target.value
                                })
                            }}
                            placeholder='event id'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>
                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={event.title}
                            onChange={(e) => {
                                setEvent({
                                    ...event,
                                    title: e.target.value
                                })
                            }}
                            placeholder='event Title'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="price"
                            value={event.price}
                            onChange={(e) => {
                                setEvent({
                                    ...event,
                                    price: e.target.value
                                })
                            }}
                            placeholder='event Price'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="start"
                            value={event.start}
                            onChange={(e) => {
                                setEvent({
                                    ...event,
                                    start: e.target.value
                                })
                            }}
                            placeholder='event Start date'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="startTime"
                            value={event.startTime}
                            onChange={(e) => {
                                setEvent({
                                    ...event,
                                    startTime: e.target.value
                                })
                            }}
                            placeholder='event Start time'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="eventImageUrl"
                            value={event.eventImageUrl}
                            onChange={(e) => {
                                setEvent({
                                    ...event,
                                    eventImageUrl: e.target.value
                                })
                            }}
                            placeholder='event Image Url'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="eventLiveUrl"
                            value={event.liveUrl}
                            onChange={(e) => {
                                setEvent({
                                    ...event,
                                    liveUrl: e.target.value
                                })
                            }}
                            placeholder='event Image Url'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>
                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            value={event.description}
                            onChange={(e) => {
                                setEvent({
                                    ...event,
                                    description: e.target.value
                                })
                            }} name="description" placeholder="event Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 ">

                        </textarea>
                    </div>

                    {/* Update event Button  */}
                    <div className="mb-3">
                        <button
                            onClick={UpdateEvent}
                            type='button'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                        >
                            Update event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProductPage;