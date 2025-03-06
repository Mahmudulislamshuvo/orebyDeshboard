import Sidebar from "./Components/Sidebar";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="/products" element={"This is home page"}></Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <div>
        <Sidebar />
      </div>
    </>
  );
}

export default App;
