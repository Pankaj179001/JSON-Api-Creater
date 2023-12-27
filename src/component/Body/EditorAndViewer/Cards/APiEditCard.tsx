'use client'
import React, { useState } from "react";
import "./card.css";
import { Box } from "@mui/material";
import Selector from "@/component/Common/components/Selector";
import { RandomString, SampleObject } from "../data/SampleObject";
export const DataType = ["array", "object", "string"];

interface CardProps {
  ApiTesting: boolean;
  setApiTesting: React.Dispatch<React.SetStateAction<boolean>>;
}
const Card = (props: CardProps) => {
  const { ApiTesting, setApiTesting } = props;

  return (
    <div className="card1">
      <h2>
        <b>Free API Editor</b>
      </h2>
      <p>
        If you want to create a simple API for testing purposes, simply enter a
        response body below and press Create API to get your custom API URL
      </p>
      <Selector
        label={"Data Type"}
        items={DataType?.map((i) => ({ itemName: i, value: i }))}
        sx={{ width: ApiTesting ? "50%" : "25%" }}
      />
      <form
        style={{
          display: "grid",
          placeItems: "center",
          margin: "auto",
          gap: 10,
          width: "100%",
          marginTop: "2%",
        }}
        action=""
        method="post"
      >
        <Box
          sx={{
            display: "grid",
            width: "90%",
            placeItems: "center",
          }}
        >
          <textarea
            style={{
              fontFamily: "serif",
              height: "400px",
              width: "100%",
              fontSize: "1.5rem",
              padding: 1.5,
            }}
            name=""
            onChange={()=>{}}
            value={SampleObject}
            placeholder="JSON Response Body"
            id=""
          />
        </Box>
        <div style={{ display: "flex" }}>
          <button type="button">Create API</button>
          {/* <button style={{ marginLeft: "20px", cursor: "auto" }}>
            Create API
          </button> */}
          <div
            style={{
              display: "flex",
              margin: "auto",
              gap: 7,
              marginLeft: 23,
            }}
          >
            <p> Test Your API</p>
            <label className="toggle-btn">
              {/* <label htmlFor="checkbox">Test Api</label> */}
              <input
                type="checkbox"
                onClick={() => setApiTesting(!ApiTesting)}
              />
              <div className="slider"></div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Card;
