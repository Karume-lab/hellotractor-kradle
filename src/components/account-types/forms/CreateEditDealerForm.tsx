"use client";
import React, { useState } from "react";
import { urls } from "@/lib/urls";
import { toast } from "sonner";
import { dealerSchema, T_DealerSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createEditDealer } from "@/app/(pages)/(protected)/account-types/create/form/actions";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingButton from "@/components/core/LoadingButton";
import { Input } from "@/components/ui/input";
import { useCountries } from "@/hooks/use-countries";
import { Button } from "@/components/ui/button";

const CreateEditDealerForm = () => {
  const router = useRouter();
  const { countries } = useCountries();

  const form = useForm<T_DealerSchema>({
    resolver: zodResolver(dealerSchema),
    defaultValues: {
      name: "",
      contacts: [],
      locations: [],
    },
  });

  const {
    fields: locationFields,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray({
    control: form.control,
    name: "locations",
  });

  const [availableCounties, setAvailableCounties] = useState<{
    [key: string]: any[];
  }>({});

  const mutation = useMutation({
    mutationFn: createEditDealer,
    onSuccess: ({ message, dealer }) => {
      toast.success(message);
      router.push(urls.PUBLIC_ADMIN_MANAGE_DEALERS_SETUP_SERVICES(dealer.id));
    },
    onError: (error: Error) => {
      toast.error("Something went wrong");
    },
  });

  const handleOnSubmit = (data: T_DealerSchema) => {
    const values = {
      name: data.name,
      contacts: data.contacts,
      locations: data.locations,
    };
    mutation.mutate(values);
  };

  const handleCountryChange = (index: number, countryId: string) => {
    const selectedCountry = countries?.find(
      (country) => country.id === countryId
    );
    if (selectedCountry) {
      setAvailableCounties((prev) => ({
        ...prev,
        [index]: selectedCountry.counties,
      }));
      form.setValue(`locations.${index}.countyId`, "");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4 py-4 px-16">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dealership Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter dealership name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Locations Section */}
        <div>
          <h3 className="text-lg font-medium">Locations</h3>
          {locationFields.map((item, index) => (
            <div key={item.id} className="space-y-2">
              <FormField
                control={form.control}
                name={`locations.${index}.address`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country Dropdown */}
              <FormField
                control={form.control}
                name={`locations.${index}.countryId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCountryChange(index, value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries?.map((country) => (
                          <SelectItem key={country.id} value={country.id}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* County Dropdown */}
              <FormField
                control={form.control}
                name={`locations.${index}.countyId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>County</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!form.watch(`locations.${index}.countryId`)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a county" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableCounties[index]?.map((county: any) => (
                          <SelectItem key={county.id} value={county.id}>
                            {county.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remove Location Button */}
              <Button
                type="button"
                onClick={() => removeLocation(index)}
                className="text-red-500"
              >
                Remove Location
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              appendLocation({ address: "", countryId: "", countyId: "" })
            }
          >
            Add Location
          </Button>
        </div>

        <LoadingButton
          text="Create"
          loadingText="Creating"
          isLoading={mutation.isPending}
        />
      </form>
    </Form>
  );
};

export default CreateEditDealerForm;
