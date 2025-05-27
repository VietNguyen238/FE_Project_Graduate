declare module "sub-vn" {
  interface Location {
    code: string;
    name: string;
  }

  export function getProvinces(): Location[];
  export function getDistricts(): Location[];
  export function getWards(): Location[];
  export function getProvincesWithDetail(): Location[];
  export function getDistrictsByProvinceCode(provinceCode: string): Location[];
  export function getWardsByDistrictCode(districtCode: string): Location[];
  export function getWardsByProvinceCode(provinceCode: string): Location[];
}
