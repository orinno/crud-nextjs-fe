import { ICompany } from "./masterTypes";

export type UserProfileResponse = {
    id: string;
    username: string;
    userType: string;
    resetPasswordToken: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
    customer?: any;
    employee?: any;
    company?: ICompany;
    isCustomer: boolean;
    group?: any;
};

export interface ILogin {
    username: string;
    password: string;
}

export interface IResponseApi {
    me?: any;
    data: any;
    totalRow: number;
    listStock?: any;
    canDelivery?: any;
    outOfRent?: any;
    extend?: any;
    terminate?: any;
    requestOrderDetail?: any;
    total?: any;
}

export interface PaginationParams {
    page: number;
    pageSize: number;
    search?: string;
    status?: string;
}