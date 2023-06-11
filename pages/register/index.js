import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

import LoadingSpinner from "@/components/LoadingSpinner";
import { object } from "prop-types";

const Index = () => {
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("token");
  //   if (accessToken) {
  //     router.replace("/home");
  //     return;
  //   }
  //   setIsSubmit(false);
  // }, []);
  const router = useRouter();
  const { email } = router.query;
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: email ? email : "",
    password: "",
    rePassword: "",
    gender: "",
    rememberMe: false,
    role: "user",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
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

    if (id === "password" || id === "rePassword") {
      // Check if the password and rePassword fields don't match
      if (id === "rePassword" && value !== registerFormData.password) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          rePassword: "Make sure your password should match",
        }));
      } else {
        // Remove the error message if the rePassword field matches the password field
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          rePassword: "",
        }));
      }
    }

    console.log(registerFormData);
    setDisabled(false);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const { name, email, password, role, gender } = registerFormData;
  //   const formData = { name, email, password, role, gender };
  
  //   const errors = validateForm(registerFormData);
  //   setFormErrors(errors);
  
  //   if (Object.keys(errors).length > 0) {
  //     setLoading(false); // Set loading to false if there are form errors
  //     return;
  //   }
  
  //   try {
  //     localStorage.setItem("registrationData", JSON.stringify(formData));
  
  //     setTimeout(() => {
  //       setLoading(false); // Set loading to false after 2 seconds
  //     }, 2000);
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, role, gender } = registerFormData;
    const formData = { name, email, password, role, gender };
  
    const errors = validateForm(registerFormData);
    setFormErrors(errors);
  
    if (Object.keys(errors).length > 0) {
      setLoading(false); // Set loading to false if there are form errors
      return;
    }
  
    try {
      // Retrieve existing registration data from local storage
      const storedData = localStorage.getItem("registrationData");
      let existingData = storedData ? JSON.parse(storedData) : [];
  
      // Ensure existingData is an array
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
  
      // Add the new form data to the existing array
      existingData.push(formData);
  
      // Save the updated array in local storage
      localStorage.setItem("registrationData", JSON.stringify(existingData));
  
      setTimeout(() => {
        setLoading(false); // Set loading to false after 2 seconds
      }, 2000);
      router.push("/profile")
    } catch (error) {
      console.log(error, "error");
    }
  };
  
  

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(registerFormData);
    }
  }, []);

  const validateForm = (values) => {
    const errors = {};
    const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    if (!values.name) {
      errors.name = "name is required";
    } else if (values.name.length > 0) {
      // Remove the error message if the name field has a value
      delete errors.name;
    }
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
    if (!values.rePassword) {
      errors.rePassword = "Re Password is required";
    } else if (
      values.rePassword.length > 0 &&
      values.password !== values.rePassword
    ) {
      errors.rePassword = "make sure your password should match";
    } else if (values.rePassword.length > 0) {
      // Remove the error message if the rePassword field has a value and it matches the password field
      delete errors.rePassword;
    }
    if (!values.gender) {
      errors.gender = "gender is required";
    } else if (values.gender.length > 0) {
      // Remove the error message if the gender field has a value
      delete errors.gender;
    }

    return errors;
  };

  return (
    <>
      <Layout>
        <div className="bg-dialogBg text-white h-auto w-[412px] rounded lg:mb-[-14rem] md:-[-14rem] mb-0 mt-]">
          <h1 className="font16-28 mt-9 ml-8">Register New Account</h1>
          <p className="ml-8 mt-6 font12-20">
            Create a password to start your membership
          </p>

          <form
            className="mt-5 h-auto  space-y-5 ml-8 mr-8 mb-1"
            onSubmit={handleSubmit}
            style={{fontFamily: "Montserrat"}} 
            >
            <Input
              type="text"
              placeholder="Enter Name"
              id="name"
              handleChange={handleChange}
              errorMsg={formErrors.name}
              hideShowStyle={"left-[90%]"}
              inputStyles="w-full"
              value={registerFormData.name}
            />
            <Input
              type="email"
              placeholder="Enter Email"
              title="should be valid email address"
              id="email"
              handleChange={handleChange}
              errorMsg={formErrors.email}
              hideShowStyle={"left-[90%]"}
              inputStyles="w-full"
              value={registerFormData.email}
            />
            <div className="">
              <Input
                type="password"
                placeholder="Enter Password"
                min={8}
                id="password"
                handleChange={handleChange}
                errorMsg={formErrors.password}
                hideShowStyle={`left-[90%] ${
                  formErrors.password ? "top-[-3.3rem]" : "top-[-2rem]"
                }`}
                inputStyles="w-full"
                value={registerFormData.password}
              />
            </div>
            <div style={{ marginTop: "0" }}>
              <Input
                type="password"
                placeholder="Re Enter Password"
                min={8}
                id="rePassword"
                handleChange={handleChange}
                errorMsg={formErrors.rePassword}
                hideShowStyle={`left-[90%] ${
                  formErrors.rePassword ? "top-[-3.3rem]" : "top-[-2rem]"
                }`}
                inputStyles="w-full"
                value={registerFormData.rePassword}
              />
            </div>
            <select
              className="w-full p-3 text-black rounded text-sm outline-none border-none"
              style={{ marginTop: "0", borderRight: "17px solid white" }}
              id="gender"
              onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <p
              className="text-sm font-poppins font-semi text-red-400"
              style={{ margin: 0, marginTop: "3px" }}>
              {formErrors.gender}
            </p>

            <div className="text-xs text-dialogSubTxt flex gap-2 items-center">
              <Checkbox
                checkboxLabel="Remember me"
                checkboxlabelStyle={{ paddingLeft: "26px" }}
                id="rememberMe"
                handleChange={handleChange}
              />
            </div>
            {loading ? (
              <button
                type="button"
                className="w-full h-[49px] bg-btnLight lg:text-sm md:text-sm text-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled>
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
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
              Already a member?
              <Link href="/signin" className="text-white">
                {" "}
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Index;
