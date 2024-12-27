import { number, object, string } from "yup";
import { lessThen, requiredText } from "./schemaConst.ts";

export const equipmentSchema = object().shape({
  id: number().notRequired(),
  typeId: number().required(requiredText),
  receiptDate: string().required(requiredText),
  safeId: number().notRequired(),
  userId: number().notRequired(),
  system: string().notRequired().max(999, `${lessThen} 1000`),
  note: string().notRequired().max(999, `${lessThen} 1000`),
}).test(
  "safeId-or-userId",
  "Владелец или сейф должны быть выбраны",
  (value) => value.safeId != null || value.userId != null
)