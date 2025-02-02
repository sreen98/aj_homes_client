export interface EnquiryManagementState {
  loading: boolean;
  error: string;
}

export interface Enquiry {
  name: string;
  emailId: string;
  subject: string;
  message: string;
  propertyId?: string;
  phoneNumber: string;
}
