import React, { useState } from "react";
import Image from "next/image";

import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";

const AddOrEditProfile = ({
  isAdult,
  name,
  profilePicture,
  buttonSection,
  handleChange,
  images,
  handleIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adult, setAdult] = useState(isAdult);

  const toggleCheckBox = () => {
    setAdult(!adult);
  };

  return (
    <div className="w-4/5 sm:w-3/4 top-[15%] flex flex-col shrink bg-darkBg">
      <div className="text-white font-poppins m-auto">
        <h3 className="font-semibold font20-30 pb-2 mb-4 sm:mb-8"></h3>
        <div className="flex flex-wrap sm:flex-nowrap gap-8 sm:gap-12 mb-20 sm:mb-24">
          <div>
            <Image
              src={"/images/avatar.jpg"}
              width={190}
              height={190}
              className="h-[109px] w-[109px] sm:h-[190px] sm:w-[190px]"
              alt="profile Image"
            />
          </div>
          <div className="flex flex-col justify-center gap-9 mt-0 sm:mt-8 w-[284px] sm:w-[352px] shrink">
            <input
              type="text"
              placeholder="Enter username"
              value={name}
              className="px-5 w-full p-3 text-black rounded text-sm placeholder-placeHolderTxt outline-none"
              onChange={handleChange} // Update the prop name to onChange
              name="name" // Add the name attribute to match the handleChange function
            />
          </div>
        </div>
        {buttonSection}
      </div>
      <hr className="h-px sm:block hidden relative -mt-24 ml-[10%] -mr-[20%] bg-HrBg border-0 dark:bg-HrBg" />
    </div>
  );
};

export default AddOrEditProfile;
