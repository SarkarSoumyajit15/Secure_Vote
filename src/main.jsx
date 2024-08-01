import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import accountStore from "./store/index.jsx";
import { persistor } from "./store/index.jsx";

import { Admin } from "./components/Admin.jsx";
import { VoterWindow } from "./components/VoterWindow.jsx";
import {  AddParty } from "./components/AddParty.jsx";
import {  RemoveParty } from "./components/RemoveParty.jsx";
import { Registration } from "./components/Registration.jsx";
import { VoterList } from "./components/VoterList.jsx";

import { PersistGate } from "redux-persist/integration/react";
import { RemoveVoter } from "./components/RemoveVoter.jsx";
import {  PartyList } from "./components/PartyList.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/voter", element: <VoterWindow /> },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "/admin", element: <VoterList /> },
      { path: "/admin/candidateList", element: <PartyList /> },
      { path: "/admin/addCandidate", element: <AddParty /> },
      { path: "/admin/removeCandidate", element: <RemoveParty /> },
      { path: "/admin/addVoter", element: <Registration /> },
      { path: "/admin/removeVoter", element: <RemoveVoter /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={accountStore}>
      <PersistGate  persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
