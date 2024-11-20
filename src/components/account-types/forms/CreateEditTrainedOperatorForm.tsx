"use client";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z
    .number()
    .positive("Price must be a positive number")
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
      message: "Price must be a valid number with up to 2 decimal places",
    }),
  certificates: z.array(z.any()).optional(),
});

type T_ServiceSchema = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  initialData?: Partial<T_ServiceSchema>;
  onSubmit: (data: T_ServiceSchema) => void;
  onCancel?: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<T_ServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || undefined,
      certificates: initialData?.certificates || [],
    },
    mode: "onChange",
  });

  const handleSubmit = (data: T_ServiceSchema) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Title</FormLabel>
              <FormControl>
                <Input placeholder="Service name" {...field} />
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
                <Textarea placeholder="Service details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Service price"
                  onChange={(e) => {
                    const numValue =
                      e.target.value === ""
                        ? undefined
                        : parseFloat(e.target.value);
                    onChange(numValue);
                  }}
                  value={value ?? ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit">Save Service</Button>
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

const trainedOperatorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  services: z.array(serviceSchema),
});

type T_TrainedOperatorSchema = z.infer<typeof trainedOperatorSchema>;

const CreateEditTrainedOperatorForm: React.FC = () => {
  const form = useForm<T_TrainedOperatorSchema>({
    resolver: zodResolver(trainedOperatorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      services: [],
    },
    mode: "onChange",
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isServiceFormVisible, setIsServiceFormVisible] = useState(false);

  const handleSaveService = (data: T_ServiceSchema) => {
    if (editingIndex !== null) {
      update(editingIndex, data);
    } else {
      append(data);
    }
    setEditingIndex(null);
    setIsServiceFormVisible(false);
  };

  const handleEditService = (index: number) => {
    setEditingIndex(index);
    setIsServiceFormVisible(true);
  };

  const handleSubmit = (values: T_TrainedOperatorSchema) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Basic Profile Fields */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Services Section */}
          <h3 className="text-lg font-bold mt-6">Services</h3>

          {/* Service List */}
          <div className="space-y-2 mb-4">
            {fields.length === 0 ? (
              <p className="text-gray-500">No services added yet.</p>
            ) : (
              fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex justify-between items-center p-3 border rounded"
                >
                  <div>
                    <p className="font-semibold">{field.title}</p>
                    <p className="text-sm text-gray-600">{field.description}</p>
                    <p className="text-sm">
                      Price: ${Number(field.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleEditService(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Service Section */}
          {!isServiceFormVisible && (
            <Button
              type="button"
              onClick={() => {
                setEditingIndex(null);
                setIsServiceFormVisible(true);
              }}
            >
              Add Service
            </Button>
          )}

          <LoadingButton
            type="submit"
            text="Save Profile"
            loadingText="Saving..."
            className="mt-4"
          />
        </form>
      </Form>
      {isServiceFormVisible && (
        <div className="p-4 border rounded">
          <ServiceForm
            initialData={
              editingIndex !== null ? fields[editingIndex] : undefined
            }
            onSubmit={handleSaveService}
            onCancel={() => {
              setIsServiceFormVisible(false);
              setEditingIndex(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default CreateEditTrainedOperatorForm;
