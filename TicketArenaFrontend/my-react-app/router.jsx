import { createBrowserRouter } from "react-router-dom";
import HomeNav from "./src/components/HomeNav";
import App from "./src/App";
import Login from "./src/components/Login";
import SignUp from "./src/components/Signup";
import Tables from "./src/components/Tables";
import Shop from "./src/components/Shop";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Highlights from "./src/components/Highlights";
import ForgetPassword from "./src/components/ForgetPassword";

// Define the Layout component here
const Layout = ({ children }) => {
  return (
    <>
      <HomeNav />
      <div>{children}</div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: "/tables",
    element: (
      <Layout>
        <Tables />
      </Layout>
    ),
  },
  {
    path: "/shop",
    element: (
      <Layout>
        <Shop />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: "/highlights",
    element: (
      <Layout>
        <Highlights />
      </Layout>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <Layout>
        <ForgetPassword />
      </Layout>
    ),
  },
]);

export default router;
