import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

export interface responseApi {
  data: any;
  message: string;
  code: number;
}

export class ApiRequestError extends Error {
  data: any;

  constructor(message: string, data: any = []) {
    super(message);
    this.name = "ApiRequestError";
    this.data = data;
  }
}

class ApiService {
  public static axiosInstance: AxiosInstance;

  static {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public static setMultiPartHeader() {
    this.axiosInstance.defaults.headers["Content-Type"] = "multipart/form-data";
    return this;
  }

  public static setJsonHeader() {
    this.axiosInstance.defaults.headers["Content-Type"] = "application/json";
    return this;
  }

  public static async request(
    url: string,
    type: string,
    data: any = [], // FormData or JSON
    callback = (result: any) => {},
    headers: any = {}
  ): Promise<AxiosResponse> {
    try {
      // Do not override Content-Type header if FormData is being sent
      const isFormData = data instanceof FormData;
      const defaultHeaders = isFormData
        ? headers // If FormData, don't set Content-Type (let the browser handle it)
        : { "Content-Type": "application/json", ...headers }; // Default to application/json

      return await this.axiosInstance
        .request({
          url,
          method: type,
          data,
          headers: defaultHeaders,
        })
        .then((res) => {
          if (typeof callback === "function") callback(res);
          return res;
        });
    } catch (e: any) {
      if (e instanceof AxiosError) {
        throw new ApiRequestError(e.response?.data?.message ?? e.message, {
          ...e.response?.data,
        });
      }
      throw new ApiRequestError(e);
    }
  }

  public static setBaseUrl(url: string) {
    this.axiosInstance.defaults.baseURL = url;
    return this;
  }

  public static async downloadFile(
    url: string,
    filename: string
  ): Promise<void> {
    try {
      const response = await this.axiosInstance.get(url, {
        responseType: "blob",
      });

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();

      link?.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(urlBlob);
    } catch (e: any) {
      if (e instanceof AxiosError) {
        throw new ApiRequestError(e.response?.data?.message ?? e.message, {
          ...e.response?.data,
        });
      }
      throw new ApiRequestError(e);
    }
  }
}

export default ApiService;
