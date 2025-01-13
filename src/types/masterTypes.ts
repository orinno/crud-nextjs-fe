export interface IBank {
  id: number;
  namabank: string;
  code: string;
}

export interface IProvince {
  id: number;
  code: string;
  province_name: string;
  countryId?: any;
  country?: ICountry;
  description: string;
}

export interface ICity {
  id: number;
  code: string;
  city_name: string;
  provinceId?: any;
  province?: IProvince;
  description: string;
}

export interface ICountry {
  id: number;
  country_name: string;
  numcode: string;
  nicename: string;
  iso: string;
  iso3: string;
  phonecode: string;
}

export interface ICompany {
  id: number;
  code: string;
  nama: string;
  prepaidCOA?: string;
  unearnedCOA?: string;
  companycodeCOA?: string;
  alamat?: string;
  discountCOA?: string;
  paymentCOA?: string;
  countryId?: ICountry;
  provinceId?: IProvince;
  cityId?: ICity;
  city?: ICity;
  country?: ICountry;
  province?: IProvince;
  logo?: string;
  advanceCoa?: string;
  latePaymentPenalty?: string;
  lateVehicleReturnPenaltyPerDay?: string;
  earlyTerminationPenalty?: string;
}

export interface IUnit {
  id: number;
  code: string;
  name: string;
  desc: string;
  coda_element6: string;
}
