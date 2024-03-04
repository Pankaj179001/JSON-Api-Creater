import { FormSection } from "@/Components/ApiEditor";
import ReadyToUse from "@/Components/ReadyToUseUrl";

export default function Home() {
  return (
    <main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "2%",
          height: "100%",
        }}
      >
        <h1>FAKE JSON API</h1>
        <h3 style={{ marginTop: "1%", opacity: ".85" }}>
          Access fake APIs with dummy data 🎭
        </h3>
        <FormSection />
        <ReadyToUse />
      </div>
    </main>
  );
}
