import Cards from "./Cards";

const ApiEditor = () => {
  return (
    <div
      style={{
        width: "80%",
        margin: "4%",
        height: "auto",
        fontWeight: "bold",
        overflow: "auto",
      }}
    >
      <h1>Create Your Own Fake JSON API</h1>
      <h2 style={{ marginTop: "1%", opacity: ".75", fontStyle: "normal" }}>
        The editor below allows you to create a fake JSON API with your own fake
        data. Scroll down for ready-to-use examples of different fake APIs.{" "}
      </h2>
      <Cards />
    </div>
  );
};

export { ApiEditor };

