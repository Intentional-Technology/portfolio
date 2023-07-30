import ReactDOM from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/index";
import Blog from "./pages/blog";

import "./styles/global.css";

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "blog", element: <Blog /> },
  ]);

  return routes;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Layout>
      <App />
    </Layout>
  </BrowserRouter>
);
