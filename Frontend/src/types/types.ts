export interface ISubService {
  title: string
  content: string
}

export interface IService {
  _id: number
  title: string
  content: string
  image: string
  subServices: ISubService[]
  status: "active" | "inactive"
  createdDate: string
  lastModified: string
  createdAt?: string
  updatedAt?: string
}

export interface IBlog {
  _id: number
  title: string
  content: string
  image: string
  status: "active" | "inactive"
}

export interface ITrainerService {
  title: string
}

export interface ITrainerSubService {
  title: string
}

export interface ITrainer {
  _id: number
  name: string;
  email: string;
  phone: number;
  designation: string;
  website?: string;
  language: string;
  experience: string;
  company: string;
  services: ITrainerService[];
  subServices: ITrainerSubService[];
  country: string;
  state: string;
  status: "active" | "inactive";
  isApproved: string;
  createdAt?: string;
  updatedAt?: string;
}