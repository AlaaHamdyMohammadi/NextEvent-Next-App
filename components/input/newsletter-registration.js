import { useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import axios from 'axios';
import NotificationContext from '../../store/notificationContext';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: 'Sign up',
      message: 'Redistering',
      status: 'pending',
    })
    // const reqBody = {email: enteredEmail}

    // const res = await axios.post(`/api/register`, reqBody, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const data = await res;
    // console.log(res)


    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if(response.ok){
          return response.json();
        }
        return response.json().then(data => {
          throw new Error(data.message || 'Something wrong')
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success",
          message: "Successfully Registered",
          status: "success",
        });
      }).catch(err => {
        notificationCtx.showNotification({
          title: "Error",
          message: "Error Registered",
          status: "error",
        });
      });
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
