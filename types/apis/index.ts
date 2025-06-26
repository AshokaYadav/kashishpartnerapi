export interface VendorCredentials {
    vendorName: string;
    userId: string;
    password: string;
    token: string;
}

export interface ApiParameters {
    reqType: string;
    rechargeValue: string;
    balanceValue: string;
    statusValue: string;
    disputeValue: string;
    billInfoValue: string;
    billPayValue: string;
    opPrefix: string;
}

export interface VendorFormData extends VendorCredentials, ApiParameters { }

export interface FormFieldProps {
    id: string;
    name: keyof VendorFormData;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    type?: string;
}
