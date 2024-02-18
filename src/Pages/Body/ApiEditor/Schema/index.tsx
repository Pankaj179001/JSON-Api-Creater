"use client";

import React, { useState } from "react";
import "./card.css";
import TestingCard from "./TestingCard";
import ApiSchema from "./ApiSchema";
const Cards = () => {
  const [ApiTesting, setApiTesting] = useState(false);

  return (
    <div className="cards" style={{ marginTop: "2%" }}>
      <ApiSchema {...{ setApiTesting, ApiTesting }} />
      {ApiTesting ? <TestingCard /> : <></>}
    </div>
  );
};

export default Cards;
