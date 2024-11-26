import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm, SignUpForm } from "@/components";

const SignInTabValue = "signIn";
const SignUpTabValue = "signUp";

const Auth = async () => {

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="border p-4 rounded ">

        <Tabs defaultValue={SignInTabValue} className="w-fit flex flex-col justify-center mx-auto">
          {/* Tab Triggers */}
          <TabsList className="flex flex-col md:flex-row justify-center mx-auto w-full">
            <TabsTrigger value={SignInTabValue} className="px-4 py-2 grow">Sign in</TabsTrigger>
            <TabsTrigger value={SignUpTabValue} className="px-4 py-2 grow">Sign up</TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value={SignInTabValue} className="w-fit">
            <SignInForm />
          </TabsContent>
          <TabsContent value={SignUpTabValue} className="w-fit">
            <SignUpForm />
          </TabsContent>
        </Tabs>

      </div>
    </section>
  );
};

export default Auth;
