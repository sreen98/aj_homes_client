export interface PropertyManagementState {
  loading: boolean;
  properties: IProperty[];
  property: IProperty;
  error: string;
}

export interface Filter {
  bathroom: Number | null;
  bedroom: Number | null;
  price: { from: null | Number; to: null | Number };
}

export interface IProperty {
  _id: string;
  title: string;
  images: string[];
  reference: string;
  postcode: string;
  description: string;
  area: number;
  floor: number;
  bathroom: number;
  bedroom: number;
  tenure: string;
  furnishingType: string;
  lettingType: string;
  minTerm: string;
  contractLength: string;
  deposit: string;
  price: string;
  payable: string;
  type: string;
  status: string;
  ytLink: string;
  mapLink: string;
  address: string;
}
