import SchemaAndTesting from "./Components";

const FormSection = () => {
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        margin: "auto",
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
      <p>
        If you want to create a simple API for testing purposes, simply enter a
        response body below and press Create API to get your custom API URL
      </p>

      <SchemaAndTesting />
    </div>
  );
};
{
}
export { FormSection };
