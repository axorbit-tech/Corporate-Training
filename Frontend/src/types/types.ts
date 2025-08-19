export interface ISubService {
  title: string
  description: string
}

export interface IService {
  _id: number
  title: string
  description: string
  image: string
  subServices: ISubService[]
  status: "active" | "inactive"
  createdDate: string
  lastModified: string
}