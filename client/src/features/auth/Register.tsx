import React from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { schema } from "./registrationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import "./Register.css";

type FormFields = z.infer<typeof schema>;

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { firstName, lastName, email, password } = data;
    const name = firstName + " " + lastName;
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          type: "manual",
          message: error.message || "An unexpected error occurred",
        });
      }
    }
  };

  return (
    <div className="hm-login">
      <div className="container">
        <div className="row">
          <div className="col-left">
            <div className="hm-col-wrap">
              <div className="hmlogo"></div>
              <div className="login-title">{/* <h1>Members Login</h1> */}</div>
            </div>
          </div>
          <div className="col-right">
            <div className="register-form-wrap">
              <h2>Register now</h2>
              <div className="l-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-row">
                    <Input
                      label="First Name"
                      name="firstName"
                      type="text"
                      className="flex-1"
                      register={register}
                      error={errors.firstName?.message}
                    />
                    <div className="fixed-with"></div>
                    <Input
                      label="Last Name"
                      name="lastName"
                      type="text"
                      className="flex-1"
                      register={register}
                      error={errors.lastName?.message}
                    />
                  </div>
                  <Input
                    label="Email"
                    name="email"
                    type="text"
                    register={register}
                    error={errors.email?.message}
                  />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                    error={errors.password?.message}
                  />
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    register={register}
                    error={errors.confirmPassword?.message}
                  />
                  <div className="terms">
                    <p>
                      By registering with you agree to our <a href="">Terms & Conditions.</a>
                    </p>
                  </div>
                  <Button disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register Now"}
                  </Button>
                  <div className="root-error-container">
                    {errors.root?.message && (
                      <span className="input-error">{errors.root?.message}</span>
                    )}
                  </div>
                </form>
                <div className="no-account">
                  <p>
                    Already have an account? <a href="/login">Login now</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
