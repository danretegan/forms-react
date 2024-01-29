import React from "react";
import styles from "./Form.module.css";
// Putem folosi orice pachet pentru a genera șiruri (string-uri) unice:
import { nanoid } from "nanoid";

class Form extends React.Component {
  loginInputId = nanoid();

  handleChange = (event) => {
    const inputValue = event.target.value;
    console.log("Input value:", inputValue);
  };

  render() {
    console.log("Unique ID generated:", this.loginInputId);

    return (
      <form>
        <div className={styles.form}>
          <label htmlFor={this.loginInputId}>Login (with nanoid): </label>
          <input
            type="text"
            name="login"
            id={this.loginInputId}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

export default Form;
