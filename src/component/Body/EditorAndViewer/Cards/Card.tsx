import React, { useState } from "react";
import "./card.css";

interface CardProps {
  ApiTesting: boolean;
  setApiTesting: React.Dispatch<React.SetStateAction<boolean>>;
}
const Card = (props: CardProps) => {
  const { ApiTesting, setApiTesting } = props;
  // const [first, setfirst] = useState('second')

  return (
    <div className="card1">
      <h2>
        <b>Free API Editor</b>
      </h2>
      <p>
        If you want to create a simple API for testing purposes, simply enter a
        response body below and press Create API to get your custom API URL
      </p>
      <form
        style={{
          display: "grid",
          placeItems: "center",
          margin: "auto",
          gap: 10,
          marginTop: "2%",
        }}
        action=""
        method="post"
      >
        <textarea
          style={{
            fontFamily: "serif",
            height: "400px",
            width: "800px",
            fontSize: "30px",
            padding: 1.5,
          }}
          name=""
          placeholder="JSON Response Body"
          id=""
        />
        <div style={{ display: "flex" }}>
          <button type="button">Create API</button>
          {/* <button style={{ marginLeft: "20px", cursor: "auto" }}>
            Create API
          </button> */}
          <div
            style={{ display: "flex", margin: "auto", gap: 7, marginLeft: 23 }}
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
