"use client";
import Selector from "@/component/Common/components/Selector";
import { Box, Typography } from "@mui/material";
import React from "react";
import { SampleObject, SampleString } from "../data/SampleObject";
import "./card.css";
import { SampleArray } from "../data/SampleArray";
export const DataType = ["array", "object", "string"];

interface CardProps {
  ApiTesting: boolean;
  setApiTesting: React.Dispatch<React.SetStateAction<boolean>>;
}
const Card = (props: CardProps) => {
  const { ApiTesting, setApiTesting } = props;
  const [dataType, setDataType] = React.useState<any>("object");
  return (
    <Box className="card1">
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(45deg,#00ccff, #ff3366,#203f9c)",
          backgroundClip: "text",
          webkitBackgroundClip: "text",
          color: "transparent",
          textAlign: "center",
        }}
      >
        Free API Editor{" "}
      </Typography>
      <Selector
        label={"Data Type"}
        items={DataType?.map((i) => ({ itemName: i, value: i }))}
        sx={{ width: ApiTesting ? "50%" : "25%" }}
        setDataType={setDataType}
      />
      <form
        style={{
          display: "grid",
          placeItems: "center",
          margin: "auto",
          gap: 10,
          width: "100%",
          // marginTop: "2%",
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
            onChange={() => {}}
            value={dataType=="object"?SampleObject:dataType=="array"?SampleArray:SampleString}
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
    </Box>
  );
};

export default Card;
