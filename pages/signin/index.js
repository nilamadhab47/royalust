import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner";

const SignIn = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setDisabled(false);
    const { id, value } = e.target;

    // setRegisterFormData({ ...registerFormData, [e.target.id]: e.target.value });
    // setFormErrors(validateForm(registerFormData));
    setRegisterFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
    console.log(registerFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = registerFormData;
  
    // Perform form validation
    const errors = validateForm(registerFormData);
    setFormErrors(errors);
  
    if (Object.keys(errors).length > 0) {
      return;
    }
  
    // Retrieve the stored registration data from local storage
    const storedData = localStorage.getItem('registrationData');
    if (!storedData) {
      // Handle the case when there is no stored registration data
      return;
    }
  
    const registrationData = JSON.parse(storedData);
  
    // Simulate sign-in process with loading timeout
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
  
      const matchedUser = registrationData.find(
        (user) => user.email === email && user.password === password
      );
  
      if (matchedUser) {
        // Successful sign-in
        console.log('Sign-in successful');
        // Perform any necessary actions or redirect to the appropriate page
        router.push("/profile");
      } else {
        // Incorrect email or password
        console.log('Invalid credentials');
        // Handle the case when the sign-in credentials are incorrect
      }
    }, 2000);
  };
  
  
  

  const validateForm = (values) => {
    const errors = {};
    const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

    if (!values.email) {
      errors.email = "email is required";
    } else if (values.email.length > 0) {
      // Remove the error message if the email field has a value
      delete errors.email;
    }
    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length > 0) {
      // Remove the error message if the password field has a value
      delete errors.password;
    }

    return errors;
  };
  return (
    <>
      <Layout>
        <div className="bg-dialogBg text-white h-[440px] w-[412px] rounded mt-12">
          <h1 className="font16-28 mt-9 ml-8">Sign In</h1>
          <p className="ml-8 mt-2 font12-18">
            Enter a password and start exploring
          </p>

          <form className="mt-9 mr-8 space-y-4 ml-8" onSubmit={handleSubmit} style={{fontFamily: "Montserrat"}} >
            <Input
              type="email"
              id="email"
              value={registerFormData.email}
              placeholder="Enter Email"
              handleChange={handleChange}
              errorMsg={formErrors.email}
              hideShowStyle={"left-[90%]"}
              inputStyles="w-full"
            />

            <div>
              <Input
                type="password"
                id="password"
                value={registerFormData.password}
                placeholder="Enter Password"
                min={8}
                handleChange={handleChange}
                errorMsg={formErrors.password}
                inputStyles="w-full"
                hideShowStyle={`left-[90%] ${
                  formErrors.password ? "top-[-3.3rem]" : "top-[-2rem]"
                }`}
              />
            </div>
            <div className="flex justify-between">
              <div className="text-xs text-dialogSubTxt flex gap-2 items-center">
                <Checkbox
                  checkboxLabel="Remember me"
                  checkboxlabelStyle={{ paddingLeft: "26px" }}
                />
              </div>
              <Link href="/signin/forgotpassword">
                <span className="text-xs text-white hover:underline hover:underline-offset-2 cursor-pointer">
                  Forgot Password
                </span>
              </Link>
            </div>
            {loading ? (
              <button
                type="button"
                className="w-full h-[49px] bg-btnLight lg:text-sm md:text-sm text-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled>
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span className="!absolute !-m-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </button>
            ) : (
              <Button
                text="Save"
                type="submit"
                btnStyle="w-full bg-btnLight lg:text-sm md:text-sm text-[10px]"
                handleClick={handleSubmit}
              />
            )}

            <p className="md:text-sm text-[9px] text-dialogSubTxt">
              New to Royalust?
              <Link href="/register" className="text-white">
                {" "}
                Register Now.
              </Link>
            </p>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default SignIn;
