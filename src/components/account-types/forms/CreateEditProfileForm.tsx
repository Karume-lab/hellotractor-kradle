"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface CreateEditProfileFormProps {
  form: any;
}

const CreateEditProfileForm: React.FC<CreateEditProfileFormProps> = ({
  form,
}) => (
  <>
    <FormField
      control={form.control}
      name="firstName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your first name ..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="middleName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Middle Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your middle name ..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your last name ..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="displayName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Display Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your display name ..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea placeholder="Enter your bio ..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

export default CreateEditProfileForm;
