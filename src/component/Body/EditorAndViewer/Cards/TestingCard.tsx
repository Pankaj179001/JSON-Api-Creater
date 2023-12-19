import React from "react";

const TestingCard = ({ ApiTesting }: { ApiTesting: boolean }) => {
  return (
    <div className="card2" style={{ display: ApiTesting ? "flex" : "none" }}>
      <h4>
        <b>Test Your Dummy Api Here</b>
      </h4>
      <form
        style={{
          display: "grid",
          placeItems: "center",
          margin: "auto",
          gap: 10,
        }}
        action=""
        method="post"
      >
        <div style={{ display: "flex", gap: 7 }}>
          <input
            placeholder="Enter url here"
            style={{ height: "38px", width: "600px" }}
            type="text"
          />
          <button type="button">Test API</button>
        </div>
        <textarea
          style={{
            fontFamily: "serif",
            height: "400px",
            width: "800px",
            fontSize: "30px",
            padding: 1.5,
          }}
          placeholder="Api Response"
          readOnly
          disabled
        />
      </form>
    </div>
  );
};

export default TestingCard;
