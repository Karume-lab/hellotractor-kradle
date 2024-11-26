"use client";
import React from "react";
import { Button } from "../ui/button";
import { getGoogleOAuthConsentUrl } from "@/app/(pages)/auth/action";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { urls } from "@/lib/urls";

const SignInWithGoogle = () => {
  return (
    <Button
      variant={"outline"}
      className="w-full"
      onClick={async () => {
        const res = await getGoogleOAuthConsentUrl();
        if (res.url) {
          window.location.href = res.url;
        } else {
          toast.error(res.message);
        }
      }}
    >
      <FcGoogle />
      <span>Continue with Google</span>
    </Button>
  );
};

export default SignInWithGoogle;
