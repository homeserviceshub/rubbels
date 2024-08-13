import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Spinner,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { useDispatch } from "react-redux";
import { CHECKLOGIN } from "../../redux/actions/actionCheckLogin";
import axios from "axios";

function Signup() {
  const [credField, setCredField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [number, setNumber] = useState(null);
  const [selectedGender, setSelectedGender] = useState("Mr");
  const [validity, setValidity] = useState({
    username: true,
    email: true,
    password: true,
    confirmPassword: true,
    number: true,
    checkbox: true,
  });
  console.log();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function Forgetpassword() {
  //   navigate("/reset-password", {
  //     replace: true,
  //   });
  // }
  function handleClose() {
    navigate(-1);
  }

  function handleSubmit(e) {
    var gender = selectedGender === "Mr" ? "male" : "female";
    e.preventDefault();
    setValidity({
      username: !!username,
      email: !!email ? (validity.email ? true : false) : false,
      number: !!number,
      password: !!password,
      confirmPassword: !!confirmPassword
        ? password === confirmPassword
          ? true
          : false
        : false,
    });
    if (
      (username,
      email,
      validity.email,
      password,
      confirmPassword,
      password === confirmPassword,
      number)
    ) {
      axios
        .post("http://localhost:8000/signup", {
          gender: gender,
          username: username,
          email: email,
          password: password,
          number: number,
        })
        .then((response) => {
          if (response.status === 200) {
            dispatch(CHECKLOGIN(true));
            navigate("/");
            console.log(response);
          }
        })
        .catch((error) => {
          console.error("AxiosError:", error);
          console.log(error);
        });

      setIsSubmitting(true);
      // dispatch(
      //   loginAction(email, password, null, () => {
      //     setIsSubmitting(false);
      //   })
      // );
    }
  }
  const setEmailIsValid = (value) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return setValidity({ ...validity, email: regex.test(value) });
  };
  return (
    <Container fluid className={styles.containerX}>
      <Row className=" justify-content-center align-items-center h-100">
        <Col md={4} className={` p-5 ${styles.containerY}`}>
          <span onClick={handleClose} className={styles.closeBtn}>
            X
          </span>
          <div className="text-center">
            <img src="/photos/" alt="logox" />
          </div>
          <Form
            onSubmit={handleSubmit}
            autoComplete="off"
            className={styles.formDesign}
          >
            <Container className="p-0">
              <Row className="py-3 justify-content-center">
                <Col md={12}>
                  <h2>Sign Up</h2>
                </Col>
                <Col md={12} className="mb-3">
                  <InputGroup className={styles.hrmn}>
                    <DropdownButton
                      variant="outline-secondary"
                      title={selectedGender}
                      onSelect={(event) => setSelectedGender(event)}
                      id={`input-group-dropdown-1`}
                      className="mb-3"
                    >
                      <Dropdown.Item eventKey="Mr">Mr</Dropdown.Item>
                      <Dropdown.Item eventKey="Ms">Ms</Dropdown.Item>
                    </DropdownButton>

                    <input
                      type="text"
                      className={`form-control ${
                        !validity.username && styles.error
                      } ${styles.customForm}`}
                      placeholder="Full Name"
                      value={username}
                      onChange={({ target: { value } }) => {
                        setUsername(value);
                        setValidity(
                          value
                            ? { ...validity, username: true }
                            : { ...validity, username: false }
                        );
                      }}
                      autoComplete="off"
                    />
                  </InputGroup>
                  {!validity.username && (
                    <small style={{ color: "red" }}>Enter Valid Username</small>
                  )}
                </Col>
                <Col md={12} className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validity.email ? "" : styles.error
                    } ${styles.customForm}`}
                    placeholder="Email Address"
                    value={email}
                    onChange={({ target: { value } }) => {
                      setEmail(value);
                      setEmailIsValid(value);
                    }}
                    autoComplete="off"
                  />
                  {!validity.email && (
                    <small style={{ color: "red" }}>Enter Valid Email</small>
                  )}
                </Col>

                <Col md={12} className=" mb-3 position-relative">
                  <input
                    type={credField ? "text" : "password"}
                    className={`form-control ${
                      !validity.password && styles.error
                    } ${styles.customForm}`}
                    placeholder="Password"
                    value={password}
                    autoComplete="off"
                    onChange={({ target: { value } }) => {
                      setPassword(value);
                      setValidity(
                        value
                          ? { ...validity, password: true }
                          : { ...validity, password: false }
                      );
                    }}
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                  {!validity.password && (
                    <small style={{ color: "red" }}>Password is required</small>
                  )}
                </Col>
                <Col md={12} className="mb-3 position-relative">
                  <input
                    type={credField ? "text" : "password"}
                    className={`form-control ${
                      !validity.confirmPassword && styles.error
                    } ${styles.customForm}`}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    autoComplete="off"
                    onChange={({ target: { value } }) => {
                      setConfirmPassword(value);
                      setValidity(
                        value
                          ? { ...validity, confirmPassword: true }
                          : { ...validity, confirmPassword: false }
                      );
                    }}
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                  {!validity.confirmPassword && (
                    <small style={{ color: "red" }}>
                      Password confirmation is required
                    </small>
                  )}
                </Col>
                <Col md={12} className="mb-3">
                  <PhoneInput
                    className={`${!validity.number && styles.error} ${
                      styles.customForm
                    }`}
                    country={"in"}
                    value={number}
                    onChange={(phone) => {
                      setNumber(phone);
                      setValidity(
                        phone
                          ? { ...validity, number: true }
                          : { ...validity, number: false }
                      );
                    }}
                  />
                  {!validity.number && (
                    <small style={{ color: "red" }}>
                      Enter Valid Phone Number
                    </small>
                  )}
                </Col>
                <Col md={12} className="mb-3">
                  {" "}
                  <div className="filterType" style={{ fontSize: "14px" }}>
                    <input
                      type="checkbox"
                      class="form-check-input m-0"
                      id="newest"
                      name="sortby"
                    />

                    <label class="form-check-label" for="newest">
                      Newsletter For Exclusive Updates
                    </label>
                  </div>
                  {/* {!validity.checkbox && (
                    <small style={{ color: "red" }}>
                      Newsletter muth be accepted
                    </small>
                  )} */}
                </Col>

                <Col md={12} className="mb-3 text-center">
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
                      "Sign Up"
                    )}
                  </Button>
                </Col>
                <hr />
                <Col md={12} className="mt-3 mb-3 text-center">
                  Already have account?
                  <span
                    className={` ${styles.signinOption} px-1`}
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Sign In
                  </span>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default Signup;
