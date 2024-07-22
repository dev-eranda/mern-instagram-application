import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
// import logo from "../../assets/images/logo-white.png";
import Toast from "../../components/ui/Toast";
import * as formik from "formik";
import { schema } from "./schema";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const View = () => {
  const { Formik } = formik;
  const [toast, setToast] = useState({ show: false, message: "", color: "" });

  const handleSubmit = async (value) => {
    const { email, password } = value;

    try {
      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error) {
        setToast({
          show: true,
          message: "Invalid email or password",
          color: "Danger",
        });
      } else {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToast({ show: true, message: "Login successful" });
      }
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "An error occurred", color: "Danger" });
    }
  };

  return (
    <div className="hm-login">
      <Container fluid>
        <Row className="g-0">
          <Col md={6} className="d-none d-md-block">
            <div className="hm-col1">
              <div className="hm-col-wrap">
                <div className="hmlogo">
                  {/* <img src={logo} className="logo-white" alt="logo" /> */}
                </div>
                <div className="login-title">
                  <h1>Members Login</h1>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="hm-col2">
              <div className="login-form-wrap">
                <h2>Login</h2>
                <div className="l-form">
                  <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{
                      email: "",
                      password: "",
                      keepme: false,
                      validateOnChange: false,
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      setFieldTouched,
                      values,
                      errors,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                          <Form.Group as={Col} md="12" controlId="validationFormikEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              aria-describedby="inputGroupPrepend"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={(e) => {
                                handleBlur(e);
                                setFieldTouched("email", true);
                              }}
                              isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} md="12" controlId="validationFormikPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={(e) => {
                                handleBlur(e);
                                setFieldTouched("password", true);
                              }}
                              isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Check
                            name="keepme"
                            label="Keep me logged in"
                            onChange={handleChange}
                            checked={values.keepme}
                            isInvalid={!!errors.keepme}
                            feedback={errors.keepme}
                            feedbackType="invalid"
                            id="validationFormikMe"
                          />
                        </Form.Group>
                        <Button type="submit" size="lg" className="loginbtn">
                          Log in
                        </Button>
                      </Form>
                    )}
                  </Formik>
                  <hr className="seperator" />
                  <div className="no-account">
                    <p>
                      Don't have an account ? Get your <a href="/register">Free account Now</a>
                    </p>
                  </div>
                  <div className="no-account">
                    <a href="">Forgotten password?</a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Toast
        show={toast.show}
        onClose={() => setToast({ show: false, message: "" })}
        message={toast.message}
        color={toast.color}
      />
    </div>
  );
};

export default View;
