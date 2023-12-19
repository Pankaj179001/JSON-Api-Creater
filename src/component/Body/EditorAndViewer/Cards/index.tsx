"use client";

import React, { useState } from "react";
import "./card.css";
import TestingCard from "./TestingCard";
import Card from "./Card";
const Cards = () => {
  const [ApiTesting, setApiTesting] = useState(false);

  return (
    <div className="cards">
      <Card {...{ setApiTesting, ApiTesting }} />
      <TestingCard ApiTesting={ApiTesting} />
    </div>
  );
};

export default Cards;
