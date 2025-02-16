import { IResponseApi, PaginationParams } from "@/types/commonTypes";
import ApiService from "../BaseService";

export async function getListUnit({
  page = 1,
  pageSize = 5,
  search = "",
}: PaginationParams): Promise<IResponseApi> {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    search,
  });
  // console.log(params);
  
  try {
    const { data } = await ApiService.request(`/units?${params.toString()}`, "GET");
    console.log(data);

    return data as IResponseApi;
  } catch (error) {
    throw error;
  }
}

export async function fetchUnitById(id: string): Promise<IResponseApi | null> {
  try {
    const { data } = await ApiService.request(`/units/${id}`, "GET");
    return data as IResponseApi;
  } catch (e) {
    console.error("Error fetching unit by ID:", e);
    throw e;
  }
}



export async function createUnit(body: any): Promise<IResponseApi | null> {
  try {
    console.log(body);
    // Validasi data sebelum mengirim permintaan
    if (!body.name || !body.description) {
      throw new Error("Name and description are required");
    }

    const { data } = await ApiService.request(`/units`, "POST", body);

    return data as IResponseApi;
  } catch (e) {
    console.error("Error creating unit:", e);
    throw e;
  }
}

export async function updateUnit(
  id: string,
  body: any
): Promise<IResponseApi | null> {
  try {
    const { data } = await ApiService.request(`/units/${id}`, "PATCH", body);

    return data as IResponseApi;
  } catch (e) {
    throw e;
  }
}

export async function deleteUnit(id: string): Promise<IResponseApi | null> {
  try {
    const { data } = await ApiService.request(`/units/${id}`, "DELETE");

    return data as IResponseApi;
  } catch (e) {
    throw e;
  }
}
