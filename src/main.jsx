import ReactDOM from "react-dom/client";
import App from "./App";
import Form from "./Form";
import SignUpForm from "./SignUpForm";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Form />
    <SignUpForm onSubmit={(values) => console.log(values)} />
  </>
);
