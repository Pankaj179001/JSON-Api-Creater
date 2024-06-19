"use client";

import React, { useState } from "react";
import "../Styles/card.css";
import ApiSchema from "./ApiSchema";
import TestingCard from "./TestingCard";
const SchemaAndTesting = () => {
  const [ApiTesting, setApiTesting] = useState(false);

  return (
    <div className="cards" style={{ marginTop: "2%", flexWrap: "wrap" }}>
      <ApiSchema {...{ setApiTesting, ApiTesting }} />
      {ApiTesting ? <TestingCard /> : <></>}
    </div>
  );
};

export default SchemaAndTesting;
