import { IPackInfo } from "@/apis/recharge";

// Base interfaces for data structures
export interface Plan {
  price: number;
  validity: string;
  data: string;
  benefits: string[];
}
export interface Circle {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string;
  updatedAt: string;
}
export interface Category {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string;
  updatedAt: string;
}
// export interface Category {
//   id: string | number;
//   name: string;
// }

export interface Operator {
  category_id: string;
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export interface RechargePlan {
  id?: string;
  price: string | number;
  validity?: string;
  data?: string;
  calls?: string;
  sms?: string;
  benefits?: string[];
  tag?: string;
}

// Props interface for the RechargeDialog component
export interface RechargeDialogProps {
  isCreating: boolean,
  handleRechargeClick: () => void;
  showConfirmDialog: boolean;
  setShowConfirmDialog: (show: boolean) => void;

  mobile: string;
  setMobile: (number: string) => void;

  selectedCircle: string;
  selectedCategory: string | number;
  selectedOperator: string | number;
  selectedPlan: IPackInfo | null;

  categories: Category[];
  operators: Operator[];
  circles: Circle[];
  password: string;
}


export interface IPaginationInfo {
  page: number | 1;
  limit: number | 20;
  // totalPages: number | 1;
}

export interface IPagination {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface PaginatedReponse<T> {
  data: T;
  pagination: IPagination;
}

export interface RechargeHistory {
  id: string;
  mobile: string;
  category_id: string;
  circle_id: string;
  api_id: string;
  retailor_id: string;
  admin_id: string;
  distributor_id: string;
  operator_id: string;
  op_id: string;
  api_txn_id: string | null;
  price: number;
  retailor_commission: number;
  distributor_commission: number;
  admin_commission: number;
  msg: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}