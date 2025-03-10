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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="/banner" element={<Banner />}></Route>
      <Route path="/category" element={<Category />}></Route>
      <Route path="/subcategory" element={<Subcategory />}></Route>
      <Route path="/flashsale" element={<Flashsale />}></Route>
      <Route path="/bestselling" element={<Bestselling />}></Route>
      <Route path="/product" element={<Product />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
