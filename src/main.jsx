import ReactDOM from "react-dom/client";
import App from "./App";
import Form from "./Form/Form";
import SignUpForm from "./SignUpForm/SignUpForm";
import "./index.css";
import LoginForm from "./LoginForm/LoginForm";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <LoginForm onSubmit={(values) => console.log(values)} />
    <Form />
    <SignUpForm onSubmit={(values) => console.log(values)} />
  </>
);
