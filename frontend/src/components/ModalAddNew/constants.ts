import { FormValues } from "../../types/CommonTypes";

interface bodyHandler {
  id: number | null;
  email: string;
  name: string;
  price: number;
  count: number;
}

export const bodyHandler = (
  data: FormValues,
  id: number | null
): bodyHandler => {
  return {
    id: id || null,
    name: data.name,
    email: data.email,
    price: parseFloat(data.price.replace(/\$/g, "").replace(",", "")),
    count: Number(data.count),
  };
};
