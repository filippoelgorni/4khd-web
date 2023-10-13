import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Cyclobrowsing from "./components/Cyclobrowsing";
import Home from "./components/Home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Home />}>
//       <Route path="cyclobrowsing" element={<Cyclobrowsing />} />
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "cyclobrowsing",
        element: <Cyclobrowsing />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
