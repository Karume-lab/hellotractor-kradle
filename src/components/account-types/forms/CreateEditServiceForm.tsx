import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import FileUploadDropZone from "@/components/core/FileUploadDropZone";
import { serviceSchema, T_ServiceSchema } from "@/lib/schemas";

interface CreateEditServiceFormProps {
  initialData?: T_ServiceSchema;
  onSave: (data: T_ServiceSchema) => void;
  onCancel: () => void;
}

const CreateEditServiceForm: React.FC<CreateEditServiceFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [certificates, setCertificates] = useState([]);
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

  const handleSubmit = (values: T_ServiceSchema) => {
    const finalData = {
      ...values,
      certificates, // Include file metadata
    };
    onSave(finalData);
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
                <Input placeholder="Service title" {...field} />
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
                <Textarea placeholder="Service description" {...field} />
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

        <FileUploadDropZone
          onUploadComplete={(fileMetadata) =>
            setCertificates(fileMetadata as any)
          }
        />
        {certificates.length > 0 && (
          <div className="text-sm text-gray-600">
            {certificates.length} file(s) uploaded
          </div>
        )}
        <div className="flex gap-2">
          <Button type="submit">Save Service</Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateEditServiceForm;
