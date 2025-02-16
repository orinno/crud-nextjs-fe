import { IResponseApi, PaginationParams } from "@/types/commonTypes";
import ApiService from "../BaseService";

export async function getListProvince({
  page = 1,
  pageSize = 10,
  search = "",
}: PaginationParams): Promise<IResponseApi> {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    search,
  });

  try {
    const { data } = await ApiService.request(`/province`, "GET");

    return data as IResponseApi;
  } catch (error) {
    throw error;
  }
}

export async function createProvince(body: any): Promise<IResponseApi | null> {
  console.log(body);
  try {
    const { data } = await ApiService.request(`/province`, "POST", body);

    return data as IResponseApi;
  } catch (e) {
    throw e;
  }
}

export async function updateProvince(
  id: string,
  body: any
): Promise<IResponseApi | null> {
  try {
    const { data } = await ApiService.request(`/province/${id}`, "PUT", body);

    return data as IResponseApi;
  } catch (e) {
    throw e;
  }
}

export async function deleteProvince(id: string): Promise<IResponseApi | null> {
  try {
    const { data } = await ApiService.request(`/province/${id}`, "DELETE");

    return data as IResponseApi;
  } catch (e) {
    throw e;
  }
}
