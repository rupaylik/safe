export interface Dictionary<T> {
  [Key: string]: T;
}

export interface IPermissionProp {
  userId?: number
  depId?: string
}

export interface ITabItem {
  id: number;
  title: string;
  Component: any;
  accessField?: string
}

export interface INameId<T extends string | number | undefined> {
  id: T;
  name: string;
}