import { IResponseApi, PaginationParams } from "@/types/commonTypes";
import api from "../BaseService";

export async function getListUnit({
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
    const { data } = await api.get(`/units`);

    return data as IResponseApi;
  } catch (error) {
    throw error;
  }
}

export async function createUnit(body: any): Promise<IResponseApi | null> {
  try {
    const { data } = await api.post(`/units`, body);

    return data as IResponseApi;
  } catch (e) {
    throw e;
  }
}

export async function updateUnit(
  id: string,
  body: any
): Promise<IResponseApi | null> {
  try {
    const { data } = await api.patch(`/units/${id}`, body);

    return data as IResponseApi;
  } catch (e) {
    throw e;
  }
}

export async function deleteUnit(id: string): Promise<IResponseApi | null> {
  try {
    const { data } = await api.delete(`/units/${id}`);

    return data as IResponseApi;
  } catch (e) {
    throw e;
  }
}
