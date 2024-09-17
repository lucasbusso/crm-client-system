import { Client } from "@/interfaces";

export function normalizeId(
  data: Client | null | undefined
): string | undefined {
  return data?.id ? data.id : data?._id;
}
