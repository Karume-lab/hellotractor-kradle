import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm, SignUpForm } from "@/components";
import ContinueWithGoogleButton from "@/components/auth/ContinueWithGoogleButton";

const SignInTabValue = "signIn";
const SignUpTabValue = "signUp";

const Auth = async () => {

  return (
    <>
      <ContinueWithGoogleButton />
      <Tabs defaultValue={SignInTabValue} className="w-[400px]">
        <TabsList>
          <TabsTrigger value={SignInTabValue}>Sign in</TabsTrigger>
          <TabsTrigger value={SignUpTabValue}>Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value={SignInTabValue}>
          <SignInForm />
        </TabsContent>
        <TabsContent value={SignUpTabValue}>
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Auth;
