"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EquipmentCondition } from "@prisma/client";

interface CreateEditEquipmentFormFieldsProps {
  form: any;
}

const CreateEditEquipmentFormFields: React.FC<CreateEditEquipmentFormFieldsProps> = ({
  form,
}) => (
  <>
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter equipment name ..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input placeholder="Enter equipment description ..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input
              type="number"
              step="0.01"
              placeholder="Enter equipment price ..."
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? undefined : parseFloat(e.target.value)
                )
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="condition"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Condition</FormLabel>
          <FormControl>
            <Select
              value={field.value ?? ""}
              onValueChange={(value) => field.onChange(value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(EquipmentCondition).map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

export default CreateEditEquipmentFormFields;
