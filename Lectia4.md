# Forms

# Elemente necontrolate

Scopul principal al oricărui formular este obținerea datelor utilizatorului. Pentru a face acest lucru, în timpul trimiterii, putem obține valorile câmpurilor din proprietatea `elements` sau folosind `FormData`. Această tehnică este folositoare atunci când datele din câmpurile formularului sunt necesare numai în timpul transmiterii sale.

```jsx
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

ReactDOM.render(
  <LoginForm onSubmit={(values) => console.log(values)} />,
  document.getElementById("root")
);
```

# Elemente controlate

Dacă valorile elementelor din formular trebuie să fie preluate în momentul modificării câmpului și să facă ceva dinamic, acestea trebuie controlate. Adică, valorile tuturor câmpurilor trebuie să fie plasate în `state`. Această tehnică de lucru cu elementele formularului este destul de simplă.

controlled_input
-Proprietatea stocată în `state` definește valoarea atributului `value` al câmpului din formular.
-Evenimentului `onChange` i se transmite o metodă care schimbă valoarea câmpului în state.

Ne confruntăm cu un cerc vicios.

-La evenimentul `onChange`, metoda clasei actualizează state-ul cu valoarea câmpului.
-Când starea se schimbă, are loc re-render.
-Input-ul afișează datele actualizate.

Dezavantajul este că întregul formular va fi randat din nou de fiecare dată când orice câmp se modifică, dar pentru formularele mici nu este o problemă.

```jsx
class App extends Component {
  state = {
    inputValue: "",
  };

  handleChange = (evt) => {
    this.setState({ inputValue: evt.target.value });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <input type="text" value={inputValue} onChange={this.handleChange} />
    );
  }
}
```

Ca și concluzie, interfața nu determină ce date avem, ci mai degrabă, datele determină ce vede utilizatorul, actualizând DOM-ul atunci când starea componentei se schimbă.

# Formulare complexe

Să creăm un formular de înregistrare.

```jsx
class SignUpForm extends Component {
  state = {
    login: "",
  };

  // Răspunde de actualizarea state-ului
  handleChange = (e) => {
    this.setState({ login: e.target.value });
  };

  // Este apelat la trimiterea formularului
  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(`Signed up as: ${this.state.login}`);

    // Props ce este transmis formularului care urmează să fie apelat la submit
    this.props.onSubmit({ ...this.state });
  };

  render() {
    const { login } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="Enter login"
            value={login}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit">Sign up as {login}</button>
      </form>
    );
  }
}

ReactDOM.render(
  <SignUpForm onSubmit={(values) => console.log(values)} />,
  document.getElementById("root")
);
```

Să adăugăm câmpuri pentru `email` și `password` și, în același timp, să folosim un pattern foarte util pentru funcția callback transmisă la `onChange`.

```jsx
// Mutăm obiectul cu primitive într-o constantă pentru a face mai ușor resetarea.
// Nu poate fi folosit dacă o proprietate din state stochează un tip de date complex.
const INITIAL_STATE = {
  login: "",
  email: "",
  password: "",
};

class SignUpForm extends React.Component {
  state = { ...INITIAL_STATE };

  // Vom crea un singur handler pentru toate elementele de input
  // Vom face distincția între input-uri, după atributul nume
  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { login, email, password } = this.state;
    console.log(`Login: ${login}, Email: ${email}, Password: ${password}`);
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { login, email, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="Enter login"
            name="login"
            value={login}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit">Sign up as {login}</button>
      </form>
    );
  }
}
```

# Generarea ID-ului pentru elementele formularului

Accessibility (a11y) - un subiect foarte important în industria web de astăzi. Atributul `for` HTML al etichetei `label` ajută tehnologia de asistență și alte tool-uri care sunt folosite în același scop. În React, acest atribut este reprezentat de `htmlFor`.

Pentru a genera identificatori unici elementelor din formular, se folosește următoarea abordare: pentru fiecare instanță de componentă, atunci când este inițializată, un set de identificatori unici este creat și stocat pe instanță. Astfel, obținem un id unic pentru diferite formulare.

```jsx
// Putem folosi orice pachet pentru a genera șiruri (string-uri) unice
import { nanoid } from "nanoid";

class Form extends React.Component {
  loginInputId = nanoid();

  render() {
    return (
      <form>
        <label htmlFor={this.loginInputId}>Login</label>
        <input type="text" name="login" id={this.loginInputId} />
      </form>
    );
  }
}
```

# Checkbox

Utilizarea casetelor checkbox este destul de simplă. O casetă de selectare poate avea doar 2 stări: `true` sau `false`.

Caracteristicile casetelor de selectare:

-Numele atributului căruia i se transmite valoarea curentă din `state` este checked. Aici trecem o valoare de tip boolean.
-La procesarea evenimentului `onChange`, pentru a obține valoarea, în obiectul de eveniment, putem accesa proprietatea `event.target.checked`.
-Dacă caseta de selectare trebuie să stocheze o valoare, aceasta poate fi, de asemenea, atașată de atributul `value` și citită din obiectul de eveniment.

Să adăugăm un checkbox la formularul nostru de înregistrare pentru a confirma acordul utilizatorului și să facem butonul de trimitere inactiv, în timp ce caseta este inactivă.

```jsx
const INITIAL_STATE = {
  login: "",
  email: "",
  password: "",
  agreed: false,
};

class SignUpForm extends React.Component {
  state = {
    ...INITIAL_STATE,
  };

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

    /* ... */
  };

  render() {
    const { login, email, password, agreed } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* ... */}
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
      </form>
    );
  }
}
```

# Radiobuttons

Spre deosebire de gruparea obișnuită a elementelor după valoarea atributului `name`, un radio button este doar un element de interfață în React, iar acesta:

-Știe dacă a fost selectat.
-Poate cere formularului să modifice ceea ce a selectat un utilizator.

De obicei, butoanele radio au atât atributul `checked`, cât și `value`. De exemplu, un buton radio responsabil de selectarea sexului utilizatorului.

```jsx
<input
  type="radio"
  checked={this.state.gender === "male"}
  value="male"
  onChage={this.handleGenderChange}
/>
```

Să adăugăm un grup de butoane radio la formularul nostru.

```jsx
// Folosim Enumerable pentru a evita antipattern-ul "magic strings"

const Gender = {
MALE: "male",
FEMALE: "female",
};

const INITIAL_STATE = {
login: "",
email: "",
password: "",
agreed: false,
gender: null,
};

class SignUpForm extends React.Component {
state = {
...INITIAL_STATE,
};

/_... _/

render() {
const { login, email, password, agreed, gender } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* ... */}

        <section>
          <h2>Choose your gender</h2>
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

        <button type="submit" disabled={!agreed}>
          Sign up as {login}
        </button>
      </form>
    );
}
}
```

# Select

Aici totul e simplu - există un selector care are opțiuni, elementul de select are `value` și `onChange`. Să adăugăm un select cu o categorie de vârstă.

```jsx
const INITIAL_STATE = {
login: "",
email: "",
password: "",
agreed: false,
gender: null,
age: "",
};

class SignUpForm extends React.Component {
state = {
...INITIAL_STATE,
};

/_ ... _/

render() {
const { login, email, password, agreed, gender, age } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* ... */}

        <label>
          Choose your age
          <select name="age" value={age} onChange={this.handleChange}>
            <option value="" disabled>
              ...
            </option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36+">36+</option>
          </select>
        </label>

        <button type="submit" disabled={!agreed}>
          Sign up as {login}
        </button>
      </form>
    );
}
}
```

# Materiale adiționale:

-Documentation - forms
-Formik
