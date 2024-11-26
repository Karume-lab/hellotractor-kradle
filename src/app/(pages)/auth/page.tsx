import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm, SignUpForm } from "@/components";

const SignInTabValue = "signIn";
const SignUpTabValue = "signUp";

const Auth = async () => {
  return (
    <section className="flex justify-center items-center h-screen m-4 my-8">
      <div className="border p-4 rounded w-full max-w-6xl">
        <Tabs
          defaultValue={SignInTabValue}
          className="flex flex-col justify-center"
        >
          {/* Tab Triggers */}
          <TabsList className="flex">
            <TabsTrigger value={SignInTabValue} className="text-center grow">
              Sign in
            </TabsTrigger>
            <TabsTrigger value={SignUpTabValue} className="text-center grow">
              Sign up
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <div className="max-h-xl">
            {/* Fixed height container */}
            <TabsContent value={SignInTabValue}>
              <SignInForm />
            </TabsContent>
            <TabsContent value={SignUpTabValue}>
              <SignUpForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default Auth;
