import { FormSection } from "@/component/Body/EditorAndViewer";
import ReadyToUse from "@/component/Body/ReadyToUseUrl";

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
          // gap: 20,
          height: "100%",
        }}
        className="homePage"
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
