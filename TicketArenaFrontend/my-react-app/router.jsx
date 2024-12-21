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
import News from "./src/components/News";
import Cart from "./src/components/Cart";
import Checkout from "./src/components/Checkout";
import Profile from "./src/components/Profile";
import Tickets from "./src/components/Tickets";

// Layout component for shared navigation
const Layout = ({ children }) => {
  return (
    <>
      <HomeNav />
      <div>{children}</div>
    </>
  );
};

// Router definition
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
  {
    path: "/cart",
    element: (
      <Layout>
        <Cart />
      </Layout>
    ),
  },
  {
    path: "/news",
    element: (
      <Layout>
        <News />
      </Layout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Layout>
        <Checkout />
      </Layout>
    ),
  },
  {
    path: "/tickets/:matchId", // Dynamic route for Tickets
    element: (
      <Layout>
        <Tickets />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
]);

export default router;
