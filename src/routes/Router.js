import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Usersign from "../views/ui/Usersign.js";

import Verfication from "../views/Verfication.js";
import Rabportal from "../views/Rabportal.js";
import Register from "../views/Register.jsx";
import Rulesdis from "../layouts/Rulesdis.js";
import Rulessec from "../layouts/Rulessec.js";
import Rulesrab from "../layouts/Rulesrab.js";
import { exact } from "prop-types";
import Home from "../views/Home.jsx";
import Transporter from "../layouts/Transporter.js";


const FullLayout = lazy(() => import("../layouts/FullLayout.js"));



const Starter = lazy(() => import("../views/Starter.js"));
const Login = lazy(() => import("../views/Login.js"));
const District = lazy(() => import("../views/District.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", exact: true, element:<Home/> },
      { path: "/transporter", exact: true, element:<Transporter/> },
      { path: "/starter", exact: true, element:<Starter/> },
      { path: "/rulesdis", exact: true, element: <Rulesdis /> },
      { path: "/rulessec", exact: true, element: <Rulessec /> },
      { path: "/rulesrab", exact: true, element: <Rulesrab /> },
      { path: "/register", exact: true, element: <Register /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/usersign", exact: true, element: <Usersign /> },
      { path: "/rabportal", exact: true, element: <Rabportal /> },
      { path: "/verification", exact: true, element: <Verfication /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/district", exact: true, element: <District /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
