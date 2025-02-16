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
  description: string;
  coda_element6: string;
}

export interface IAccident {
  name: string;
  code: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  absen: string;
  description: string;
}

export interface IClasses {
  name: string;
  code: string;
  grade_id: string;
  program_id: string;
  index: string;
  start_time: string;
  end_time: string;
}

export interface IEdulevel {
  name: string;
  code: string;
  description: string;
}

export interface IGrade {
  name: string;
  code: string;
  description: string;
}

export interface Institute {
  code: string;
  name: string;
  edu_level_id: string;
  leader_name: string;
  email: string;
  telephone: string;
  address: string;
  province_id: string;
  city_id: string;
  district_id: string;
  village_id: string;
  post_code: string;
  logo: string;
}

export interface IProgram {
  name: string;
  code: string;
  description: string;
}

export interface IStudent {
  name: string;
  gender: string;
  institution: string;
  email: string;
  class: string;
  password: string;
  birth_place: string;
  birth_date: string;
  address: string;
  province: string;
  city: string;
  district: string;
  village: string;
}

export interface ITeacher {
  nip: string;
  nuptk: string;
  name: string;
  gender: string;
  email: string;
  password: string;
  birth_place: string;
  birth_date: string;
  address: string;
  villege: string;
  district: string;
  city: string;
  province: string;
  no_kapreg: string;
  nrg: string;
  jabatan_fungsionalitas: string;
  tmt_jabatan_fungsional: string;
  pangkat: string;
  tmt_pangkat: string;
  golongan: string;
  status_pegawai: string;
  jenis_guru: string;
}

// jadwal pelajaran
export interface IClassSchedule {
  class_id: string;
  academic_year_id: number;
  teacher_id: number;
  day: string;
  start_time: string;
  end_time: string;
  status: string;
}
