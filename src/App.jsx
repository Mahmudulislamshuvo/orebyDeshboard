import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import Banner from "./Components/Banner/Banner";
import Category from "./Components/Category/Category";
import Subcategory from "./Components/SubCategory/Subcategory";
import Flashsale from "./Components/FlashSales/Flashsale";
import Bestselling from "./Components/BestSelings/Bestselling";
import Product from "./Components/Products/Product";
import Order from "./Components/Orders/Order";
import Productlist from "./Components/ProductLists/Productlist";
import OrderDetails from "./Components/OrderDetails/OrderDetails";
import WelcomeText from "./Components/Welcome/WelcomText";
import Inbox from "./Components/Inbox/Inbox";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import View from "./Components/CommonComponents/View";
import EditProduct from "./Components/ProductLists/EditProduct";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}>
        <Route path="/banner" element={<Banner />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="/subcategory" element={<Subcategory />}></Route>
        <Route path="/flashsale" element={<Flashsale />}></Route>
        <Route path="/bestselling" element={<Bestselling />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/productlist" element={<Productlist />}></Route>
        <Route path="/singleorder" element={<OrderDetails />}></Route>
        <Route path="/inbox" element={<Inbox />}></Route>
        <Route path="/" element={<WelcomeText />}></Route>
        <Route path="/view/:id" element={<View />}></Route>
        <Route path="/editproduct/:id" element={<EditProduct />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Registration />}></Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
