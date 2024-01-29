import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./SignUpForm.module.css";

// Folosim Enumerable pentru a evita antipattern-ul "magic strings":
const Gender = {
  MALE: "male",
  FEMALE: "female",
};

// Mutăm obiectul cu primitive într-o constantă pentru a face mai ușor resetarea.
// Nu poate fi folosit dacă o proprietate din state stochează un tip de date complex.
const INITIAL_STATE = {
  login: "",
  email: "",
  password: "",
  agreed: false,
  gender: null,
  age: "",
};

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  // Vom crea un singur handler pentru toate elementele de input
  // Vom face distincția între input-uri, după atributul nume
  handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    // Dacă elementul este un checkbox,
    // atunci vom lua valoarea din atributul checked,
    // în caz contrar, din atributul value
    this.setState({ [name]: type === "checkbox" ? checked : value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { login, email, password, agreed } = this.state;
    console.log(
      `Login: ${login}, Email: ${email}, Password: ${password}, Agreed: ${agreed}`
    );
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState(INITIAL_STATE);
  };

  render() {
    const { login, email, password, agreed, gender, age } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.formGroup}>
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter login"
              name="login"
              value={login}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label>
            Email:
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label>
            Password:
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <section>
          <p>Choose your gender:</p>
          <label>
            Male
            <input
              type="radio"
              checked={gender === Gender.MALE}
              name="gender"
              value={Gender.MALE}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Female
            <input
              type="radio"
              checked={gender === Gender.FEMALE}
              name="gender"
              value={Gender.FEMALE}
              onChange={this.handleChange}
            />
          </label>
        </section>

        <label>
          Choose your age:
          <select name="age" value={age} onChange={this.handleChange}>
            <option value="" disabled>
              ...
            </option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36+">36+</option>
          </select>
        </label>
        <section>
          <label>
            Agree to terms
            <input
              type="checkbox"
              name="agreed"
              checked={agreed}
              onChange={this.handleChange}
            />
          </label>

          <button type="submit" disabled={!agreed}>
            Sign up as {login}
          </button>
        </section>
      </form>
    );
  }
}

export default SignUpForm;

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
