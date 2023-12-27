import React from "react";

const TestingCard = ({ ApiTesting }: { ApiTesting: boolean }) => {
  return (
    <div
      className="card2"
      style={{ display: ApiTesting ? "flex" : "none", marginTop: "4%" }}
    >
      <h4>
        <b>Test Your Dummy Api Here</b>
      </h4>
      <form
        style={{
          display: "grid",
          placeItems: "center",
          margin: "auto",
          gap: 10,
          width: "100%",
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
    </div>
  );
};

export default TestingCard;
