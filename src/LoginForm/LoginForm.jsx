// Elemente necontrolate
/**Scopul principal al oricărui formular este obținerea datelor utilizatorului. Pentru a face acest lucru, în timpul trimiterii, putem obține valorile câmpurilor din proprietatea 'elements' sau folosind 'FormData'. Această tehnică este folositoare atunci când datele din câmpurile formularului sunt necesare numai în timpul transmiterii sale. */

import { Component } from "react";
import PropTypes from "prop-types";

class LoginForm extends Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const login = form.elements.login.value;
    const password = form.elements.password.value;
    console.log(login, password);
    this.props.onSubmit({ login, password });
    form.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="login" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
