import React from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
// import logo from "../../assets/images/logo-white.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { z } from "zod";
import "./Login.css";

type FormFields = z.infer<typeof schema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
    } catch (error) {
      setError("root", {
        message: "Email is already taken",
      });
    }
  };

  return (
    <div className="hm-login">
      <div className="container">
        <div className="row">
          <div className="col-left">
            <div className="hm-col-wrap">
              <div className="hmlogo">
                {/* <img src={logo} className="logo-white" alt="logo" /> */}
              </div>
              <div className="login-title">
                <h1>Members Login</h1>
              </div>
            </div>
          </div>
          <div className="col-right">
            <div className="login-form-wrap">
              <h2>Login</h2>
              <div className="l-form">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                  <Button disabled={isSubmitting}>
                    {isSubmitting ? "Log in..." : "Log in"}
                  </Button>
                  <div className="root-error-container">
                    {errors.root?.message && (
                      <span className="input-error">
                        {errors.root?.message}
                      </span>
                    )}
                  </div>
                </form>
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
        </div>
      </div>
    </div>
  );
};
export default Login;
