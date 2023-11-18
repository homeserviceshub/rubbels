import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
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
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { CHECKLOGIN } from "../../../redux/actions/actionCheckLogin";
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

  async function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:8000/signup", {
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
          <Form onSubmit={handleSubmit} className={styles.formDesign}>
            <Container className="p-0">
              <Row className="py-3 justify-content-center">
                <Col md={12}>
                  <h2>Sign Up</h2>
                </Col>
                <Col md={12} className="mb-3">
                  <InputGroup>
                    <DropdownButton
                      variant="outline-secondary"
                      title={selectedGender}
                      onSelect={(event) => setSelectedGender(event)}
                      id={`input-group-dropdown-1`}
                    >
                      <Dropdown.Item eventKey="Mr">Mr</Dropdown.Item>
                      <Dropdown.Item eventKey="Ms">Ms</Dropdown.Item>
                    </DropdownButton>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      value={username}
                      onChange={({ target: { value } }) => setUsername(value)}
                      autoComplete="off"
                    />
                  </InputGroup>
                </Col>
                <Col md={12} className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                    autoComplete="off"
                  />
                </Col>
                <Col md={12} className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Mobile Number"
                    value={number}
                    onChange={({ target: { value } }) => setNumber(value)}
                    autoComplete="off"
                  />
                </Col>
                <Col md={12} className=" mb-3 position-relative">
                  <input
                    type={credField ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    autoComplete="off"
                    onChange={({ target: { value } }) => setPassword(value)}
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </Col>
                <Col md={12} className="mb-3 position-relative">
                  <input
                    type={credField ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    autoComplete="off"
                    onChange={({ target: { value } }) =>
                      setConfirmPassword(value)
                    }
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </Col>
                <Col md={12} className="mb-3">
                  {" "}
                  <div className="filterType" style={{ fontSize: "14px" }}>
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="newest"
                      name="sortby"
                    />
                    <label class="form-check-label" for="newest">
                      Newsletter For Exclusive Updates
                    </label>
                  </div>
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
                    className={styles.signinlink}
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
