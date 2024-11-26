"use client";
import React from "react";
import SignUpToday from "../auth/SignUpToday";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex flex-row items-center  justify-between px-2">
      <Image
        src="/img/Core/Logos/HT_LOGO_RGB_Orange.png"
        alt="logo"
        width={150}
        height={150}
      />

      <div className="flex flex-row gap-4 items-center ">
        <SignUpToday />
        {/* <ThemeChanger /> */}
      </div>
    </header>
  );
};

export default Header;
