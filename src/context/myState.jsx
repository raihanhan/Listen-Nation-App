/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import MyContext from './myContext';
import { db } from '../FirebaseConfig';
import { collection, onSnapshot, orderBy, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

function MyState({ children }) {
    const [loading, setLoading] = useState(false);
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [getAllOrder, setGetAllOrder] = useState([]);

    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "events"), orderBy('time'));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "order"), orderBy('time'));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const deleteEvent = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'order', id));
            toast.success('Order Deleted successfully');
            getAllOrderFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const approveTransaction = async (orderId) => {
        try {
            const orderRef = doc(db, "order", orderId);
            await updateDoc(orderRef, {
                status: "confirmed",
            });
            toast.success("Order Approved Successfully");
            
            // Send email notification
            const order = getAllOrder.find(order => order.id === orderId);
            if (order) {
                sendEmailNotification(order);
            }
        } catch (error) {
            console.error("Error approving transaction: ", error);
            toast.error("Failed to approve order");
        }
    };

    const sendEmailNotification = (order) => {
        const totalPrice = order.cartItems.reduce((total, item) => total + item.price, 0);
        const templateParams = {
            to_name: order.addressInfo.name,
            from_name: 'Listen App',
            to_email: order.email,
            message: `Transaksi ${order.id} dengan total Rp. ${totalPrice} telah BERHASIL. Terima Kasih`,
        };

        emailjs.send('service_xa8op9h', 'template_5q797un', templateParams, 'ZeAtbmrEWViqH2JVq')
            .then((response) => {
                console.log('Email sent successfully:', response.text);
                toast.success('Notification email sent successfully');
            }, (error) => {
                console.log('Failed to send email:', error.text);
                toast.error('Failed to send notification email');
            });
    };
    const rejectTransaction = async (orderId) => {
        try {
            const orderRef = doc(db, "order", orderId);
            await updateDoc(orderRef, {
                status: "rejected",
            });
            toast.success("Order Rejected Successfully");
    
            // Send email notification about the rejection
            const order = getAllOrder.find(order => order.id === orderId);
            if (order) {
                sendRejectionEmailNotification(order);
            }
        } catch (error) {
            console.error("Error rejecting transaction: ", error);
            toast.error("Failed to reject order");
        }
    };
    
    const sendRejectionEmailNotification = (order) => {
        const templateParams = {
            to_name: order.addressInfo.name,
            from_name: 'Listen App',
            to_email: order.email,
            message: `Transaksi ${order.id} ditolak. Silakan hubungi dukungan kami untuk lebih lanjut.`,
        };
    
        emailjs.send('service_xa8op9h', 'template_5q797un', templateParams, 'ZeAtbmrEWViqH2JVq')
            .then((response) => {
                console.log('Rejection email sent successfully:', response.text);
                toast.success('Notification email sent successfully');
            }, (error) => {
                console.log('Failed to send rejection email:', error.text);
                toast.error('Failed to send rejection email');
            });
    };

    useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction();
    }, []);

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            getAllOrder,
            deleteEvent,
            approveTransaction,
            rejectTransaction
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;
