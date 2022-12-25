import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../Firebase";

export default function LoginSite() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    try {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          console.log(user);
          navigate("/dashboard");
        });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h1>LoginSite</h1>

      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
