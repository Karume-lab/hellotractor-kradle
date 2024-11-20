"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  T_TrainedOperatorXProfileSchema,
  trainedOperatorXProfileSchema,
} from "@/lib/combined-schemas";
import LoadingButton from "@/components/core/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import CreateEditProfileForm from "./CreateEditProfileForm";
import { Input } from "@/components/ui/input";
import { profileDefaultValues } from "@/lib/form-defaults";

const CreateEditTrainedOperatorForm = () => {
  const form = useForm<T_TrainedOperatorXProfileSchema>({
    resolver: zodResolver(trainedOperatorXProfileSchema),
    defaultValues: {
      ...profileDefaultValues,
      services: [],
    },
    mode: "onChange",
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "services",
  });


  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSaveService = (
    data: T_TrainedOperatorXProfileSchema["services"][number]
  ) => {
    if (editingIndex !== null) {
      update(editingIndex, data);
    } else {
      console.log(data);
      append(data);
    }
    setEditingIndex(null);
    setIsFormVisible(false);
  };

  const handleEditService = (index: number) => {
    setEditingIndex(index);
    const service = fields[index];
    form.setValue(`services.${index}`, service);
    setIsFormVisible(true);
  };

  const handleCancelEdit = () => {
    if (editingIndex !== null) {
      form.resetField(`services.${editingIndex}`);
    }
    setEditingIndex(null);
    setIsFormVisible(false);
  };

  const handleAddService = () => {
    setEditingIndex(null);
    setIsFormVisible(true);
  };

  const handleSubmit = (values: T_TrainedOperatorXProfileSchema) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CreateEditProfileForm form={form} />

        <h3 className="text-lg font-bold mt-4">Services</h3>

        {/* Service List */}
        <div className="mb-6">
          {fields.length === 0 ? (
            <p>No services added yet. Click 'Add Service' to start.</p>
          ) : (
            fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between py-2 border-b"
              >
                <div>
                  <p className="font-semibold">{field.title}</p>
                  <p className="text-sm">{field.description}</p>
                  <p className="text-sm text-gray-500">
                    Price: ${field.price?.toFixed(2) || "N/A"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleEditService(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      remove(index);
                      setEditingIndex(null);
                      setIsFormVisible(false);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Service Button */}
        {!isFormVisible && (
          <Button type="button" onClick={handleAddService}>
            Add Service
          </Button>
        )}

        {/* Add/Edit Service Form */}
        {isFormVisible && (
          <div className="mb-4">
            <h4 className="text-lg font-semibold">
              {editingIndex !== null ? "Edit Service" : "Add New Service"}
            </h4>
            <FormField
              control={form.control}
              name={`services.${editingIndex ?? fields.length}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Service title"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`services.${editingIndex ?? fields.length}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Service description"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`services.${editingIndex ?? fields.length}.price`}
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter service price ..."
                      value={value ?? ""}
                      onChange={(e) => {
                        const numValue =
                          e.target.value === ""
                            ? undefined
                            : parseFloat(e.target.value);
                        onChange(numValue);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                onClick={() =>
                  form.handleSubmit((data) =>
                    handleSaveService(data.services[editingIndex ?? 0])
                  )()
                }
              >
                Save
              </Button>
              {editingIndex !== null && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        )}

        <LoadingButton
          type="submit"
          text="Save All"
          loadingText="Saving..."
          className="mt-4"
        />
      </form>
    </Form>
  );
};

export default CreateEditTrainedOperatorForm;
