import React, { useEffect, useState } from "react";

import Head from "next/head";

import Button from "@/components/Button";
import ProfileCard from "@/components/ProfileCard";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter()
  const [manageProfileClicked, setManageProfileClicked] = useState(false);
  const togglemanageProfile = () => {
    setManageProfileClicked(!manageProfileClicked);
  };
  const [profiles, setProfiles] = useState([]);

  const fetchAllProfiles = async () => {
    try {
      const storedData = localStorage.getItem("registrationData");
      if (storedData) {
        const registrationData = JSON.parse(storedData);
        setProfiles(registrationData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  console.log(profiles);

  console.log(profiles);
  return (
    <>
      <Head>
        <title>Profile</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-darkBg text-offWhiteTxt">
        <section className=" h-[70%] w-screen flex justify-center items-center ">
          <div className=" w-3/4 flex flex-col">
            <div className="text-white font-poppins m-auto text-center">
              <h3 className="font-semibold font20-30 pb-2 mb-8">
                Who is watching?
              </h3>
              <div className="flex justify-center items-center gap-4 sm:gap-12 mb-12 flex-nowrap">
                {profiles.map((profile, key) => (
                  <ProfileCard
                    key={key}
                    profileImage={"/images/avatar.jpg"}
                    profileName={profile.name}
                    manageProfileClicked={manageProfileClicked}
                    href={key}
                    // Add other necessary props here
                  />
                ))}
              </div>
              <Button
                text="Manage Profile"
                type="submit"
                btnStyle="w-[158px] h-[44px] bg-btnDark text-[16px]"
                handleClick={togglemanageProfile}
              />
              <Button
                text="Home"
                type="submit"
                btnStyle="w-[158px] h-[44px] bg-btnDark text-[16px] m-4"
                handleClick={()=> router.push("/")}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
