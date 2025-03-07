import Sidebar from "./Components/Sidebar";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import Banner from "./Components/Banner/Banner";
import Category from "./Components/Category/Category";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="/banner" element={<Banner />}></Route>
      <Route path="/category" element={<Category />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
