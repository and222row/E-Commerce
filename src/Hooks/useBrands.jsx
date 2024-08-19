import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useBrands() {
  function getRecentBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let responseObject = useQuery({
    queryKey: ["recentBrands"],
    queryFn: getRecentBrands,
    staleTime: 5000,
    select: (data) => data.data.data,
  });
  return responseObject;
}
