"use client";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { T_ServiceSchema } from "@/lib/schemas";
import CreateEditServiceForm from "./forms/CreateEditServiceForm";
import { useMutation } from "@tanstack/react-query";
import { createTrainedOperatorServices } from "@/app/(pages)/(protected)/account-types/create/form/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { urls } from "@/lib/urls";

const ServicesContainer: React.FC = () => {
  const form = useForm<{ services: T_ServiceSchema[] }>({
    defaultValues: {
      services: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSaveService = (values: T_ServiceSchema) => {
    if (editingIndex !== null) {
      update(editingIndex, values);
    } else {
      append(values);
    }
    setEditingIndex(null);
    setIsFormVisible(false);
  };

  const handleEditService = (index: number) => {
    setEditingIndex(index);
    setIsFormVisible(true);
  };

  const handleDeleteService = (index: number) => {
    remove(index);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsFormVisible(false);
  };

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createTrainedOperatorServices,
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push(urls.DASHBOARD);
    },
    onError: (error: Error) => {
      if (error.message === "Unauthorized") {
        toast.error(error.message);
        router.push(urls.AUTH);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleSaveAllServices = async () => {
    const servicesWithoutIds = fields.map(({ id, ...service }) => service);
    // mutation.mutate(servicesWithoutIds);
    console.log(servicesWithoutIds);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Services</h3>

      <div className="space-y-2">
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
                  onClick={() => handleDeleteService(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {!isFormVisible && (
        <Button
          type="button"
          onClick={() => {
            setEditingIndex(null);
            setIsFormVisible(true);
          }}
        >
          Add Service
        </Button>
      )}

      {isFormVisible && (
        <div className="p-4 border rounded">
          <CreateEditServiceForm
            key={editingIndex ?? "new"}
            initialData={
              editingIndex !== null ? fields[editingIndex] : undefined
            }
            onSave={handleSaveService}
            onCancel={handleCancel}
          />
        </div>
      )}

      <Button onClick={handleSaveAllServices} disabled={mutation.isPending}>
        Save all services
      </Button>
    </div>
  );
};

export default ServicesContainer;
