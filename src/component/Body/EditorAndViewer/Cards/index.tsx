"use client";

import React, { useState } from "react";
import "./card.css";
import TestingCard from "./TestingCard";
import Card from "./APiEditCard";
const Cards = () => {
  const [ApiTesting, setApiTesting] = useState(false);

  return (
    <div className="cards" style={{ marginTop: "2%" }}>
      <Card {...{ setApiTesting, ApiTesting }} />
      {ApiTesting ? <TestingCard /> : <></>}
    </div>
  );
};

export default Cards;
