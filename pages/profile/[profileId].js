import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import AddOrEditProfile from "@/components/addOrEditProfile";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EditProfile() {
  const router = useRouter();
  const { profileId } = router.query;
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    gender: "",
  });

  useEffect(() => {
    // Retrieve the profile data from local storage based on the profileId
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      const registrationData = JSON.parse(storedData);
      const profile = registrationData[profileId];
      if (profile) {
        setProfileData(profile);
      }
    }
  }, [profileId]);

  const handleChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("profile data", profileData);
    try {
      // Update the profile data in local storage based on the profileId
      const storedData = localStorage.getItem("registrationData");
      if (storedData) {
        const registrationData = JSON.parse(storedData);
        registrationData[profileId] = profileData;
        localStorage.setItem("registrationData", JSON.stringify(registrationData));
      }
      setLoading(false);
      router.push("/profile"); // Redirect to the appropriate page after saving the profile
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


  return (
    <>
      <Head>
        <title>Edit Profile</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-darkBg text-offWhiteTxt">
        <section className=" absolute top-[20%] w-screen flex items-center justify-center sm:justify-center lg:justify-start flex-wrap sm:px-[5%]">
          <AddOrEditProfile
            name={
              profileData.name
            }
            isAdult={""}
            handleChange={handleChange}
            buttonSection={
              <div className="flex gap-6 -mt-16 sm:mt-10 ">
                {loading ? (
                  <button
                    type="button"
                    className="w-[80px] h-[44px] bg-btnDark text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
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
                    btnStyle="w-[77px] h-[44px] bg-btnDark text-[16px]"
                    handleClick={handleSubmit}
                  />
                )}
                <Button
                  text="Cancel"
                  type="submit"
                  btnStyle="w-[94px] h-[44px] bg-btnDark text-[16px]"
                />
                {/* <Button
                  text="Delete"
                  type="submit"
                  btnStyle="w-[88px] h-[44px] bg-btnDark text-[16px]"
                  handleClick={handleDelete}
                /> */}
              </div>
            }
          />
        </section>
      </main>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { profileId } = params;

//   // Fetch data for the product with the specified productId
//   const res = await fetch(`https://example.com/api/products/${profileId}`, {});
//   const profile = await res.json();
//   console.log(profile);
//   return {
//     props: {
//       profile,
//     },
//   };
// }
