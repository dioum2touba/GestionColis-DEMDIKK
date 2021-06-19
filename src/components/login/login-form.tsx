import { ChangeEvent, FormEvent, useState } from "react";
import { userService } from "./authentication/user-service";
import { Link } from 'react-router-dom';

type LoginFormProps = {
  onSuccessfulLoginEvent(): void;
};

export function LoginForm(props: LoginFormProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    var formdata = new FormData();
    formdata.append("client_id", "ro.client");
    formdata.append("grant_type", "password");
    formdata.append("username", login);
    formdata.append("client_secret", "secret");
    formdata.append("password", password);
    userService.login(login, password);
    event.preventDefault();
  }

  function handleLoginChange(event: ChangeEvent<HTMLInputElement>) {
    setLogin(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <div className="hold-transition login-page">
      {/* {errorMessage !== null && <div>{errorMessage}</div>} */}
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <Link to="../../index2.html" className="h1">
              <b>COLIS</b>DDD
            </Link>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={login}
                  onChange={handleLoginChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  autoComplete="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label /*for="remember"*/>Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            {/* <div className="social-auth-links text-center mt-2 mb-3">
              <Link to="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
              </Link>
              <Link to="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i> Sign in using
                Google+
              </Link>
            </div> */}

            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p className="mb-0">
              <Link to="register.html" className="text-center">
                Register a new membership
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}