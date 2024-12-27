import { ValidationError } from "yup";

export const getError = (path: string, errors?: ValidationError[]) => {

  return errors?.find(e => e.path == path || e.type == path)?.message
}

export const hasError = (path: string, errors?: ValidationError[]) => {
  return getError(path, errors) != undefined
}