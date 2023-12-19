import React from "react";

const ReadyToUse = () => {
  return (
    <div style={{ display: "grid", width: "80%" }}>
      <h2
        style={{
          paddingTop: "1.4em !important",
          paddingBottom: "0em !important",
          fontWeight: 600,
          // position:"relative"
        }}
      >
        Ready to Use Fake APIs
      </h2>

      <p
        style={{
          paddingTop: "1em !important",
          paddingBottom: " 1em !important",
          margin: "0px",
        }}
      >
        Below we have created APIs that serve test data for you to use. We
        created them with the form above. If you want to create your own API
        instead of using ours, feel free!
      </p>
    </div>
  );
};

export default ReadyToUse;
