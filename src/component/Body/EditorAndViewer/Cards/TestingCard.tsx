import { Box ,Typography} from "@mui/material";
import React from "react";

const TestingCard = () => {
  return (
    <Box
      className="card1"
    >
        <Typography variant="h4" sx={{fontWeight: "bold",
    background: "linear-gradient(45deg,#ff3366,#203f9c,#00ccff)",
    backgroundClip:"text",
    webkitBackgroundClip: "text",
    color: "transparent",
    textAlign: "center"}}
        >
Test Your Dummy Api Here      </Typography>
      <form
        style={{
          display: "grid",
          placeItems: "center",
          margin: "auto",
          gap: 10,
          width: "100%",
          marginTop:"1%"
        }}
        action=""
        method="post"
      >
        <div
          style={{
            display: "flex",
            width: "70%",
            justifyContent: "center",
            alignItems: "center",
            gap: 7,
          }}
        >
          <input
            placeholder="Enter url here"
            style={{ height: "38px", width: "70%" }}
            type="text"
          />
          <button style={{ width: "30%" }} type="button">
            Test API
          </button>
        </div>
        
        <textarea
          style={{
            fontFamily: "serif",
            height: "400px",
            width: "90%",
            fontSize: "30px", 
            padding: 1.5,
          }}
          placeholder="Api Response"
          readOnly
          disabled
        />
      </form>
    </Box>
  );
};

export default TestingCard;
