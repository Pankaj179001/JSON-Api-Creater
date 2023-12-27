"use client";

import React, { useState } from "react";
import "./card.css";
import TestingCard from "./TestingCard";
import Card from "./APiEditCard";
const Cards = () => {
  const [ApiTesting, setApiTesting] = useState(false);

  return (
    <div className="cards" style={{ gap: "10px !important" }}>
      <Card {...{ setApiTesting, ApiTesting }} />
      <TestingCard ApiTesting={ApiTesting} /> 
    </div>
  );
};

export default Cards;
