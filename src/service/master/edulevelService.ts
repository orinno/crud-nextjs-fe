import { IResponseApi, PaginationParams } from "@/types/commonTypes";
import ApiService from "../BaseService";

export async function getListEduLevel({
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
    const { data } = await ApiService.request(`/edulevel`, "GET");

    return data as IResponseApi;
  } catch (error) {
    throw error;
  }
}

export async function createEduLevel(body: any): Promise<IResponseApi | null> {
  console.log(body);
  try {
    const { data } = await ApiService.request(`/edulevel`, "POST", body);

    return data as IResponseApi;
  } catch (e) {
    throw e;
  }
}

export async function updateEdulevel(
  id: string,
  body: any
): Promise<IResponseApi | null> {
  try {
    const { data } = await ApiService.request(`/edulevel/${id}`, "PUT", body);

    return data as IResponseApi;
  } catch (e) {
    throw e;
  }
}

export async function deleteEdulevel(id: string): Promise<IResponseApi | null> {
  try {
    const { data } = await ApiService.request(`/edulevel/${id}`, "DELETE");

    return data as IResponseApi;
  } catch (e) {
    throw e;
  }
}
