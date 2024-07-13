import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/Home/Home";
import EventDetail from "./pages/EventDetail/EventDetail";
// import NoPage from "./pages/noPage/NoPage";
import ScrollTop from "./components/scrollTop/ScrollTop";
import Cart from "./pages/CartPages/Cart"
import Signup from "./pages/Registrations/Signup";
import Login from "./pages/Registrations/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./ProtectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./ProtectedRoute/ProtectedRoutedForAdmin";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import AllEvents from "./pages/EventsPage/EventsPage";
import AllArchives from "./pages/ArchivesPage/ArchivesPage";
import Ticket from "./pages/Ticket/Ticket";
import LivePage from "./pages/LivePage/LivePage";

const App = () => {
  return (
    <div>
      <MyState>
      <Router>
        <ScrollTop/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/EventDetail/:id" element={<EventDetail/>}/>
          <Route path="/Ticket" element={
            <ProtectedRouteForUser>
            <Ticket/>
            </ProtectedRouteForUser>}/>
          <Route path="/Cart" element={
            <ProtectedRouteForUser>
            <Cart/>
            </ProtectedRouteForUser>} />
          <Route path="/EventsPage" element={<AllEvents/>}/>
          <Route path="/ArchivesPage" element={<AllArchives/>}/>
          <Route path="/Login" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>} />
          <Route path="/admin-dashboard" element={
            <ProtectedRouteForAdmin>
            <AdminDashboard />
            </ProtectedRouteForAdmin>} />
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
            <AddProductPage />
            </ProtectedRouteForAdmin>} />
          <Route path="/updateproduct/:id" element={
            <ProtectedRouteForAdmin>
            <UpdateProductPage/>
            </ProtectedRouteForAdmin>} />
          <Route path="/livePage/:idEvent" element={
            <ProtectedRouteForUser>
              <LivePage/>
              </ProtectedRouteForUser>}>
          </Route>
        </Routes> 
        <Toaster/>
      </Router>
      </MyState>
    </div>
  );
}

export default App;
