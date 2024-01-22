import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./pages/Products";
import Gyms from "./pages/Gyms";
import CreateProduct from "./pages/CreateProduct";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
          <Home />
        </div>
      ),
    },
    {
      path: "/products",
      element: (
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
          <Products />
        </div>
      ),
    },
    {
      path: "/gyms",
      element: (
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
          <Gyms />
        </div>
      ),
    },
    {
      path: "/addProduct",
      element: (
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
          <CreateProduct/>
        </div>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
