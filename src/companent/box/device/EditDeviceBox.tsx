import { IDevice } from "../../../interfaces/data.ts";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { initialDevice } from "../../../constants/initialObj.ts";
import {
  useGetImeiAllQuery,
  useGetModelsQuery,
  useGetOsesQuery,
  useGetSnNumberAllQuery,
} from "../../../service/rtk/api/deviceFieldApi.ts";
import useSourceText from "../../../hooks/useSourceText.ts";
import { SelectorINameId } from "../../SelectorINameId.tsx";
import { Stack, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { dateViewFormat } from "../../../constants/deviceConst.tsx";
import { computeMd5Hash } from "../../../util/cryptoUtil.ts";
import CustomButton from "../button/CustomButton.tsx";
import {
  useAgreementDeleteDeviceMutation,
  useDeleteDeviceMutation,
  useSaveDeviceMutation
} from "../../../service/rtk/api/deviceApi.ts";
import LoadingBox from "../../LoadingBox.tsx";
import deviceSchema from "../../../validations/schemas/deviceSchema.ts";
import { ValidationError } from "yup";
import { getError, hasError } from "../../../validations/methods.ts";
import QRCodeBox from "../QRCodeBox.tsx";
import dayjs from "dayjs";
import AutocompleteString from "../AutocompleteString.tsx";
import EquipmentDeleteButton from "../button/EquipmentDeleteButton.tsx";
import EditOwnerFields from "../EditOwnerFields.tsx";
import AgreementDeleteButton from "../button/AgreementDeleteButton.tsx";
import BrandSelector from "./selector/BrandSelector.tsx";
import { useImmer } from "use-immer";
import TypeSelector from "../selector/TypeSelector.tsx";
import { useHasAccessByPermissions } from "../../../hooks/useHasAccessByPermissions.ts";
import { useTheme } from "@mui/material/styles";

interface Props {
  device?: IDevice,
  startEditDevice?: IDevice,
  onSaved: () => void
}

const EditDeviceBox = (props: Props) => {
  const theme = useTheme<any>();
  const label = { ...useSourceText().device, ...useSourceText().equipment };
  const [device, setDevice] = useImmer<IDevice>(props.device ? props.device : initialDevice)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [initDevice] = useState<IDevice>(props.device ? props.device : initialDevice)
  const [validateOption, setValidateOption] = useState({
    abortEarly: false,
    context: {
      allImei: [],
      allSnNumbers: [],
    }
  })
  const prevImei1 = useRef('');
  const { data: allImei = [] } = useGetImeiAllQuery()
  const { data: allSnNumbers = [] } = useGetSnNumberAllQuery()
  const { data: models } = useGetModelsQuery()
  const { data: oses } = useGetOsesQuery()
  const [deleteDevice] = useDeleteDeviceMutation()
  const [saveDevice, { isLoading }] = useSaveDeviceMutation()
  const [agreementDelete] = useAgreementDeleteDeviceMutation()

  const managerOrAdmin = useHasAccessByPermissions(
    ['DEVICE:DEP_MANAGER_EDIT', 'DEVICE:EDIT'],
    {
      depId: initDevice?.userDepId ? initDevice.userDepId : initDevice?.safeDepId
    }) && device.dataDelete == undefined

  const userORManagerOrAdmin = useHasAccessByPermissions(
    ['DEVICE:OWNER_USER_EDIT', 'DEVICE:OWNER_DEP_EDIT', 'DEVICE:DEP_MANAGER_EDIT', 'DEVICE:EDIT'],
    {
      userId: initDevice?.userId,
      depId: initDevice?.userDepId ? initDevice.userDepId : initDevice?.safeDepId
    }) && device?.id != undefined && device.dataDelete == undefined

  useEffect(() => {
    setValidateOption({
      ...validateOption,
      context: {
        ...validateOption.context,
        allImei: (device.id ? allImei.filter(i => i != device.imei1) : allImei) as never[],
        allSnNumbers: (device.id ? allSnNumbers.filter(i => i != device.snNumber) : allSnNumbers) as never[],
      }
    })
  }, [allImei, allSnNumbers]);

  useEffect(() => {
    setDevice(props.device ? props.device : initialDevice)
  }, [props.device]);

  useEffect(() => {
    if (device.imei1 != prevImei1.current) {
      const hash = device.imei1.length > 4 ? computeMd5Hash(computeMd5Hash(device.imei1)) : '';
      setDevice({ ...device, hash })
    }
    prevImei1.current = device.imei1
    deviceSchema.validate(device, validateOption)
      .then(() => {
        setErrors([])
      })
      .catch((e: ValidationError) => {
        setErrors(e.inner)
      });
  }, [device]);

  const save = (e: any) => {
    e.preventDefault()
    deviceSchema.validate(device, validateOption)
      .then(() => {
        saveDevice(device)
          .then(() => props.onSaved())
      })
      .catch((e: ValidationError) => {
        setErrors(e.inner)
      });
  }

  const handleFieldBlur = (fieldName: string) => {
    device[fieldName] && setDevice({ ...device, [fieldName]: device[fieldName].trim() })
  }

  const handleDelete = async (id: number, comment: string) => {
    await deleteDevice({ id, comment })
    props.onSaved()
  }

  const handleAgreement = async (id: number) => {
    await agreementDelete(id)
  }

  return (
    <Stack onSubmit={save} component="form" spacing={2}
           sx={{
             m: 1,
             '& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled': {
               color: theme.palette.color.disabled,
                 '-webkit-text-fill-color':theme.palette.color.disabled
             }
           }}>
      {isLoading && <LoadingBox/>}
      <Stack direction={"row"}>
        <Stack spacing={2} sx={{ minWidth: 600 }}>
          <TypeSelector
            disabled={!managerOrAdmin}
            typeId={device.typeId}
            typeEquipmentId={1}
            onChange={setDevice}
            error={hasError(`typeId`, errors)}
            helperText={getError(`typeId`, errors)}
          />
          <Stack direction={"row"} spacing={1}>
            <BrandSelector
              sx={{ flexGrow: 1 }}
              disabled={!managerOrAdmin}
              brandId={device.brandId}
              onChange={setDevice}
              error={hasError(`brandId`, errors)}
              helperText={getError(`brandId`, errors)}
            />
            <AutocompleteString
              disabled={!(managerOrAdmin || userORManagerOrAdmin)}
              label={label.model}
              options={models}
              value={device.model}
              setValue={(model?: string) => {
                setDevice({ ...device, model: model || '' })
              }}
              onBlur={() => handleFieldBlur('model')}
              error={hasError(`model`, errors)}
              helperText={getError(`model`, errors)}
            />
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <SelectorINameId
              disabled={!managerOrAdmin}
              sx={{ flexGrow: 1 }}
              label={label.os}
              value={device.osId || ''}
              items={oses}
              setValue={(value) => setDevice({ ...device, osId: value })}
              error={hasError(`osId`, errors)}
              helperText={getError(`osId`, errors)}
            />
            <TextField
              disabled={!(managerOrAdmin || userORManagerOrAdmin)}
              fullWidth
              sx={{ flexGrow: 1 }}
              size="small"
              label={label.osVersion}
              value={device.osVersion || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDevice({ ...device, osVersion: e.target.value })
              }
              onBlur={() => handleFieldBlur('osVersion')}
              error={hasError(`osVersion`, errors)}
              helperText={getError(`osVersion`, errors)}
            />
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <TextField
              disabled={!managerOrAdmin}
              sx={{ flexGrow: 1 }}
              type={'number'}
              label={label.displaySize}
              value={device.displaySize || ''}
              size="small"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDevice({ ...device, displaySize: parseFloat(e.target.value) || undefined })
              }
              error={hasError(`displaySize`, errors)}
              helperText={getError(`displaySize`, errors)}
            />
            <TextField
              disabled={!managerOrAdmin}
              sx={{ flexGrow: 1 }}
              type={'number'}
              label={label.ppi}
              value={device.ppi || ''}
              size="small"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDevice({ ...device, ppi: parseInt(e.target.value) || undefined })
              }
              error={hasError(`ppi`, errors)}
              helperText={getError(`ppi`, errors)}
            />
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <TextField
              disabled={!managerOrAdmin}
              sx={{ flexGrow: 1 }}
              label={label.imei1}
              value={device.imei1 || ''}
              size="small"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDevice({ ...device, imei1: e.target.value })
              }
              onBlur={() => handleFieldBlur('imei1')}
              error={hasError(`imei1`, errors)}
              helperText={getError(`imei1`, errors)}
            />
            <TextField
              disabled={!managerOrAdmin}
              sx={{ flexGrow: 1 }}
              label={label.imei2}
              value={device.imei2 || ''}
              size="small"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDevice({ ...device, imei2: e.target.value })
              }
              onBlur={() => handleFieldBlur('imei2')}
              error={hasError(`imei2`, errors)}
              helperText={getError(`imei2`, errors)}
            />
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <TextField
              disabled={!managerOrAdmin}
              sx={{ width: '100%' }}
              label={label.snNumber}
              value={device.snNumber || ''}
              size="small"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDevice({
                  ...device,
                  snNumber: e.target.value.trim() == ''
                    ? undefined
                    : e.target.value
                })
              }
              onBlur={() => handleFieldBlur('snNumber')}
              error={hasError(`snNumber`, errors)}
              helperText={getError(`snNumber`, errors)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
              <DateTimePicker
                disabled={!managerOrAdmin}
                sx={{ width: '100%' }}
                views={['year', 'month', 'day']}
                label={label.receiptDate}
                value={
                  dayjs(device.receiptDate, dateViewFormat)
                }
                onChange={(value) =>
                  setDevice({ ...device, receiptDate: dayjs(value).format(dateViewFormat) })
                }
                slotProps={{
                  textField: {
                    size: 'small',
                    error: hasError(`receiptDate`, errors),
                    helperText: getError(`receiptDate`, errors)
                  },
                }}
              />
            </LocalizationProvider>
          </Stack>
          <EditOwnerFields
            equipment={device}
            startEditEquipment={props.startEditDevice}
            setEquipment={setDevice}
            errors={errors}
            canEdit={(managerOrAdmin || userORManagerOrAdmin)}
          />
          <TextField
            disabled={!(managerOrAdmin || userORManagerOrAdmin)}
            multiline
            rows={3}
            label={label.system}
            value={device.system || ''}
            size="small"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDevice({ ...device, system: e.target.value })
            }
            onBlur={() => handleFieldBlur('system')}
          />
          <TextField
            disabled={!(managerOrAdmin || userORManagerOrAdmin)}
            multiline
            rows={3}
            label={label.note}
            value={device.note || ''}
            size="small"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDevice({ ...device, note: e.target.value })
            }
            onBlur={() => handleFieldBlur('note')}
          />
          {device.dataDelete != undefined &&
            <p>
              {`${label.deleteComment}: ${device.deleteComment}`}
            </p>
          }
        </Stack>
        <Stack flexGrow={1} justifyContent={"center"} alignItems={"center"}>
          <QRCodeBox hash={device.hash} name={device.model}/>
        </Stack>
      </Stack>
      <Stack direction={"row"} spacing={2}>
        {(managerOrAdmin || userORManagerOrAdmin) &&
          <CustomButton
            type={"submit"}
            title={label.save}
          />
        }
        <EquipmentDeleteButton title={label.deleteTitle} onDelete={handleDelete} equipment={device}/>
        <AgreementDeleteButton equipment={device} onAgreement={handleAgreement}/>
      </Stack>
    </Stack>
  );
};

export default EditDeviceBox;