import Layout from "../../components/Layout/Layout";
import myContext from "../../context/myContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Ensure this is used in route setup
import { db } from "../../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const LivePage = () => {
  const { loading, setLoading } = useContext(myContext);
  const [events, setEvent] = useState(null);  // Use `null` to indicate no data initially
  const { idEvent } = useParams(); // Ensure parameter name matches the one in your route

  const getEventData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "events", idEvent); // Ensure 'events' is the correct collection name
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEvent(docSnap.data());
      } else {
        console.log("No such document!");
        setEvent(null); // Set to null if no document found
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventData();
  }, [idEvent]); // Include idEvent to refetch data when id changes

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : events ? (
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <iframe
                  width="100%"
                  height="500"
                  src={events.liveUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        ) : (
          <p>No event found for ID {idEvent}.</p>
        )}
      </section>
    </Layout>
  );
};

export default LivePage;
