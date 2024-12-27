import { number, object, string } from "yup";
import { lessThen, moreThen, mustBeUnique, requiredText } from "./schemaConst.ts";
import { equipmentSchema } from "./equipmentSchema.ts";

const deviceSchema = equipmentSchema.concat(
  object().shape({
    brandId: number().required(requiredText),
    model: string().required(requiredText).min(2, `${moreThen} 1`).max(99, `${lessThen} 100`),
    imei1: string().required(requiredText).min(5, `${moreThen} 4`).max(17, `${lessThen} 18`),
    imei2: string().notRequired()
      .test(
        "empty-or-valid-length",
        "Должно быть больше 14 и меньше 18",
        (value) => !value || (value.length >= 14 && value.length <= 18)
      ),
    hash: string().required(requiredText),
    snNumber: string().notRequired().min(5, `${moreThen} 4`).max(99, `${lessThen} 100`),
    displaySize: number().notRequired().min(1, `${moreThen} 0`).max(99, `${lessThen} 100`),
    ppi: number().notRequired().min(100, `${moreThen} 99`).max(999, `${lessThen} 1000`),
    osId: number().notRequired(),
    osVersion: string().notRequired().matches(
      /^(\d+(\.\d+){0,2}|)$/,
      "Должен быть формат X.X.X"
    ).nullable(),
  }).test(
    'snNumber',
    mustBeUnique,
    function (item) {
      const { allSnNumbers } = this.options.context || { allSnNumbers: []}; // Получаем данные из контекста
      if (!item.snNumber) return true; // Если поле пустое, пропускаем проверку
      return !allSnNumbers.includes(item.snNumber); // Проверяем уникальность
    }
  ).test(
    'imei1',
    mustBeUnique,
    function (item) {
      const { allImei } = this.options.context || { allImei: []}; // Получаем данные из контекста
      if (!item.imei1) return true; // Если поле пустое, пропускаем проверку
      return  !(allImei.length != 0 && allImei.includes(item.imei1)); // Проверяем уникальность
    }
  )
)

export default deviceSchema