import { createBrowserRouter } from "react-router-dom";
import App from "./src/App";
import Login from "./src/components/Login";
import SignUp from "./src/components/Signup";
import Tables from "./src/components/Tables"; 
import Shop from "./src/components/Shop"; 
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Highlights from "./src/components/Highlights";
import ForgetPassword from "./src/components/ForgetPassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/tables", 
    element: <Tables />,
  },
  {
    path: "/shop", 
    element: <Shop />,
  },
  {
    path: "/about",
    element: <About />, 
  },
  {
    path: "/contact", 
    element: <Contact />,
  },
  {
    path: "/highlights", 
    element: <Highlights />,
  },
  
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },


]);

export default router;
