import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { useDispatch } from "react-redux";
import { CHECKLOGIN } from "../../redux/actions/actionCheckLogin";
import axios from "axios";

function SignIn() {
  const [credField, setCredField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function Forgetpassword() {
    navigate("/reset-password", {
      replace: true,
    });
  }
  function SignUp() {
    navigate("/signup", {
      replace: true,
    });
  }
  function handleClose() {
    navigate("/", {
      replace: true,
    });
  }
  function handleSubmit(e) {
    setShowError(false);
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post("http://localhost:8000/login", {
        email: email.toLowerCase(),
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setTimeout(function () {
            setIsSubmitting(false);
            setShowError(true);
          }, 1000);
          console.log(response.data.message, "yaaaa");
        } else {
          console.log(response.data, "gl bngi");
          if (response.data[0].username === "admin") {
            navigate("/letmemakesomechangesinwebsite");
          } else {
            localStorage.setItem("auth", response.data[0]._id);
            dispatch(CHECKLOGIN(true));
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.error("AxiosError:", error);
        console.log(error);
      });
    // dispatch(
    //   loginAction(email, password, null, () => {
    //     setIsSubmitting(false);
    //   })
    // );
  }
  return (
    <Container fluid className={styles.containerX}>
      <Row className="mx-1 justify-content-center align-items-center h-100">
        <Col md={4} className={` p-5 ${styles.containerY}`}>
          <span onClick={handleClose} className={styles.closeBtn}>
            X
          </span>
          <div className="text-center">
            <img src="/photos/" alt="logox" />
          </div>
          <Form onSubmit={handleSubmit} className={styles.formDesign}>
            <Container className="p-0">
              <Row className="py-3 justify-content-center">
                <Col md={12} className="mb-3 text-center">
                  <h2>Sign in</h2>
                </Col>
                <Col md={12} className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${styles.customForm}`}
                    placeholder="Email Address"
                    value={email}
                    onChange={({ target: { value } }) => {
                      setEmail(value);
                      setShowError(false);
                    }}
                    autoComplete="off"
                  />
                </Col>
                <Col md={12} className="position-relative">
                  <input
                    type={credField ? "text" : "password"}
                    className={`form-control ${styles.customForm}`}
                    placeholder="Password"
                    value={password}
                    autoComplete="off"
                    onChange={({ target: { value } }) => {
                      setPassword(value);
                      setShowError(false);
                    }}
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </Col>
                {showError && (
                  <small style={{ color: "red" }}>
                    Enter Data is Incorrect
                  </small>
                )}
                <Col md={12} className="text-center pt-4">
                  <Button
                    type="submit"
                    className={styles.signInLink}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Spinner
                        animation="border"
                        className={styles.signInLoader}
                      />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <a
                    href="hhtp:google.com"
                    alt="Forggetin"
                    onClick={Forgetpassword}
                  >
                    Forget your Password ?
                  </a>
                  <div className={styles.lineDiv}></div>
                  <div>
                    <Button
                      type="submit"
                      className={styles.signInLink}
                      disabled={isSubmitting}
                      onClick={SignUp}
                    >
                      Create New Account
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default SignIn;
