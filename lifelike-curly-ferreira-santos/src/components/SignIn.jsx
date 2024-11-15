import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);

    await loginUser(email, password);
    setIsRegistering(false);
    navigate("/");
  };

  return (
    <div>
      <div>
        <h2>Create your account</h2>
      </div>

      <div>
        <form onSubmit={onSubmit} action="#" method="POST">
          <div>
            <label htmlFor="email">Email address</label>
            <div>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="password">Password</label>
              <div>
                <Link to="/signup">
                  New User?
                </Link>
              </div>
            </div>
            <div>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div>
            <button disabled={isRegistering} type="submit">
              {isRegistering ? "Logging..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
