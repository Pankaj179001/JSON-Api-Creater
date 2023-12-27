import Cards from "./Cards";
const ApiEditor = () => {
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        margin: "4%",
        fontWeight: "bold",
        alignItems: "center",
        placeItems: "center",
        overflow: "auto",
      }}
    >
      <h1 style={{ margin: "auto" }}>Create Your Own Fake JSON API</h1>
      <h2 style={{ marginTop: "1%", opacity: "0.75", fontStyle: "normal" }}>
        The editor below allows you to create a fake JSON API with your own fake
        data. Scroll down for ready-to-use examples of different fake APIs.{" "}
      </h2>

      <Cards />
    </div>
  );
};

export { ApiEditor };

