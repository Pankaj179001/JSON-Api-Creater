import { FormSection } from "@/View/Components/ApiEditor";
import ReadyToUse from "@/View/Components/ReadyToUseUrl";
import { Bounce, ToastContainer } from "react-toastify";

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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
}
