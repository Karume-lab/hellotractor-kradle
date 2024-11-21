"use client";

import LoadingButton from "@/components/core/LoadingButton";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { urls } from "@/lib/urls";
import CreateEditEquipmentFormFields from "../CreateEditEquipmentFormFields";
import { equipmentDefaultValues } from "@/lib/form-defaults";
import { createEditAttachment } from "@/app/(pages)/(protected)/equipment/attachments/create/actions";
import {
  attachmentXEquipmentSchema,
  T_AttachmentXEquipmentSchema,
} from "@/lib/combined-schemas";

const CreateEditAttachmentForm = () => {
  const router = useRouter();
  const form = useForm<T_AttachmentXEquipmentSchema>({
    resolver: zodResolver(attachmentXEquipmentSchema),
    defaultValues: {
      ...equipmentDefaultValues,
      color: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createEditAttachment,
    onSuccess: ({ message }) => {
      toast.success(message);
      form.reset();
      router.push(urls.ATTACHMENTS);
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

  const handleOnSubmit = async (values: T_AttachmentXEquipmentSchema) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4">
        <CreateEditEquipmentFormFields form={form} />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter color ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          text="Create"
          loadingText="Creating"
          isLoading={mutation.isPending}
        />
      </form>
    </Form>
  );
};

export default CreateEditAttachmentForm;
