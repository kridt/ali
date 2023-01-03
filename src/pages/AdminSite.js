import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { auth, database } from "../Firebase";

export default function AdminSite() {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  useEffect(() => {
    if (auth.currentUser === null) {
      navigate("/");
    }
    if (auth.currentUser.email !== "chrnielsen2003@gmail.com") {
      navigate("/");
    }
  }, [user]);
  console.log(user);
  async function handleCreateUser(e) {
    e.preventDefault();
    console.log(e.target.name.value);

    try {
      auth
        .createUserWithEmailAndPassword(
          e.target.email.value,
          e.target.password.value
        )
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;

          database
            .collection("users")
            .doc(user.uid)
            .set({
              name: e.target.name.value,
              email: e.target.email.value,
              id: user.uid,
            })
            .then(() => {
              alert("Bruger oprettet");
              navigate("/dashboard");
            });
        });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>Tilbage</button>
      <h1 style={{ textAlign: "center" }}>Admin side</h1>

      <div>
        <h2 style={{ textAlign: "center" }}>Tilføj ny bruger</h2>
        <form onSubmit={(e) => handleCreateUser(e)}>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" />
          </div>
          <br />
          <br />
          <div>
            <label htmlFor="password">Password: </label>
            <input type="text" name="password" id="password" />
          </div>
          <br />
          <br />
          <div>
            <label htmlFor="name">Navn: </label>
            <input type="text" name="name" id="name" />
          </div>
          <br />
          <br />
          <input type="submit" value={"Opret"} />
        </form>
      </div>
    </div>
  );
}
