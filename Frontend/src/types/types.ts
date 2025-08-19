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
}

export interface IBlog {
  _id: number
  title: string
  content: string
  image: string
  status: "active" | "inactive"
}