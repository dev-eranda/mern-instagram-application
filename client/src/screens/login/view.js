import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/logo-white.png";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import "./styles.css";

const View = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be no more than 20 characters")
      .required("Password is required"),
    keepme: yup.boolean(),
  });

  const handleSubmit = (event) => {};

  return (
    <div className="hm-login">
      <Container fluid>
        <Row className="g-0">
          <Col md={6}>
            <div className="hm-col1">
              <div className="hm-col-wrap">
                <div className="hmlogo">
                  <img src={logo} className="logo-white" alt="logo" />
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
                    onSubmit={console.log}
                    initialValues={{
                      email: "",
                      password: "",
                      keepme: false,
                    }}
                  >
                    {({ handleSubmit, handleChange, values, errors }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationFormikEmail"
                          >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              aria-describedby="inputGroupPrepend"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationFormikPassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
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
                      Don't have an account ? Get your{" "}
                      <a href="/register">Free account Now</a>
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
    </div>
  );
};

export default View;
