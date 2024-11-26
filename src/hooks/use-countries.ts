import { urls } from "@/lib/urls";
import { useQuery } from "@tanstack/react-query";

interface County {
  id: string;
  name: string;
  countryId: string;
}

interface Country {
  id: string;
  name: string;
  counties: County[];
}

export function useCountries() {
  const {
    data: countries,
    isLoading,
    error,
  } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await fetch(urls.API_COUNTRIES);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { countries, isLoading, error };
}
