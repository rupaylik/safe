import { object, string } from "yup";
import { equipmentSchema } from "./equipmentSchema.ts";
import { lessThen, moreThen, requiredText } from "./schemaConst"

export const simSchema = equipmentSchema.concat(
  object().shape({
    receiptDate: string().notRequired(),
    simNo: string().required(requiredText).min(5, `${moreThen} 4`).max(25, `${lessThen} 25`),
    msisdn: string().notRequired().min(5, `${moreThen} 4`).max(17, `${lessThen} 18`),
  }));