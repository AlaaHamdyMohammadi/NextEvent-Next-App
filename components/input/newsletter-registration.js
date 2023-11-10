import { useRef } from 'react';
import classes from './newsletter-registration.module.css';
import axios from 'axios';

function NewsletterRegistration() {
  const emailInputRef = useRef();

  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const reqBody = {email: enteredEmail}

    const res = await axios.post(`/api/register`, reqBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res;
    console.log(data)


    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
