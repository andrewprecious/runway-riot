import React from "react";
import { useLocation } from "react-router-dom";

const UseLo = () => {
  // Use the useLocation hook to access the location object
  const location = useLocation();

  // The location object contains information about the current URL
  console.log(location.pathname); // e.g., "/about"
  console.log(location.search); // e.g., "?query=example"
  console.log(location.hash); // e.g., "#section"

  return (
    <div>
      <h1>Current Path: {location.pathname}</h1>
      <p>Search Query: {location.search}</p>
      <p>Hash: {location.hash}</p>
    </div>
  );
};

export default UseLo;
