import useSourceText from "../../../hooks/useSourceText.ts";
import { ChangeEvent, useEffect, useState } from "react";
import { ISim } from "../../../interfaces/data.ts";
import { initialSim } from "../../../constants/initialObj.ts";
import { ValidationError } from "yup";
import { Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
import LoadingBox from "../../LoadingBox.tsx";
import { getError, hasError } from "../../../validations/methods.ts";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { dateViewFormat } from "../../../constants/deviceConst.tsx";
import EditOwnerFields from "../EditOwnerFields.tsx";
import CustomButton from "../button/CustomButton.tsx";
import EquipmentDeleteButton from "../button/EquipmentDeleteButton.tsx";
import {
  useAgreementDeleteSimMutation,
  useDeleteSimMutation,
  useSaveSimMutation
} from "../../../service/rtk/api/simApi.ts";
import { simSchema } from "../../../validations/schemas/simSchema.ts";
import AgreementDeleteButton from "../button/AgreementDeleteButton.tsx";
import TypeSelector from "../selector/TypeSelector.tsx";
import { useImmer } from "use-immer";
import { useHasAccessByPermissions } from "../../../hooks/useHasAccessByPermissions.ts";

interface Props {
  sim?: ISim,
  startEditSim?: ISim,
  onSaved: () => void
}

const EditSimBox = (props: Props) => {
  const label = { ...useSourceText().sim, ...useSourceText().equipment };
  const validateOption = { abortEarly: false }
  const [sim, setSim] = useImmer<ISim>(props.sim ? props.sim : initialSim)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [initDevice] = useState<ISim>(props.sim ? props.sim : initialSim)
  const [saveSim, { isLoading }] = useSaveSimMutation()
  const [deleteSim, { isLoading: isDeleteLoading }] = useDeleteSimMutation()
  const [agreementDelete] = useAgreementDeleteSimMutation()

  const managerOrAdmin = useHasAccessByPermissions(
    ['SIM:DEP_MANAGER_EDIT', 'SIM:EDIT'],
    {
      depId: initDevice?.userDepId ? initDevice.userDepId : initDevice?.safeDepId
    }) && sim.dataDelete == undefined

  const userORManagerOrAdmin = useHasAccessByPermissions(
      ['SIM:OWNER_USER_EDIT', 'SIM:OWNER_DEP_EDIT', 'SIM:DEP_MANAGER_EDIT', 'SIM:EDIT'],
      {
        userId: initDevice?.userId,
        depId: initDevice?.userDepId ? initDevice.userDepId : initDevice?.safeDepId
      })
    && sim.dataDelete == undefined
    && (managerOrAdmin || (!managerOrAdmin && sim.id != undefined))

  useEffect(() => {
    setSim(props.sim ? props.sim : initialSim)
  }, [props.sim]);

  useEffect(() => {
    simSchema.validate(sim, validateOption)
      .then(() => {
        setErrors([])
      })
      .catch((e: ValidationError) => {
        setErrors(e.inner)
      });
  }, [sim]);

  const save = (e: any) => {
    e.preventDefault()
    simSchema.validate(sim, validateOption)
      .then(() => {
        saveSim(sim)
          .then(() => props.onSaved())
      })
      .catch((e: ValidationError) => {
        setErrors(e.inner)
      });
  }

  const handleFieldBlur = (fieldName: string) => {
    // @ts-ignore
    sim[fieldName] && setSim({ ...sim, [fieldName]: sim[fieldName].trim() })
  }

  const handleDelete = async (id: number, comment: string) => {
    await deleteSim({ id, comment })
    props.onSaved()
  }

  const handleAgreement = async (id: number) => {
    await agreementDelete(id)
  }

  return (
    <Stack onSubmit={save} component="form" spacing={2} sx={{ m: 1 }}>
      {(isLoading || isDeleteLoading) && <LoadingBox/>}
      <Stack direction={"row"}>
        <Stack spacing={2} sx={{ minWidth: 540 }}>
          <TypeSelector
            disabled={!userORManagerOrAdmin}
            typeId={sim.typeId}
            typeEquipmentId={2}
            onChange={setSim}
            error={hasError(`typeId`, errors)}
            helperText={getError(`typeId`, errors)}
          />
          <Stack direction={"row"} spacing={1}>
            <TextField
              disabled={!userORManagerOrAdmin}
              sx={{ width: '100%' }}
              label={label.msisdn}
              value={sim.msisdn}
              size="small"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSim({
                  ...sim,
                  msisdn: e.target.value
                })
              }
              onBlur={() => handleFieldBlur('msisdn')}
              error={hasError(`msisdn`, errors)}
              helperText={getError(`msisdn`, errors)}
            />
            <TextField
              disabled={!userORManagerOrAdmin}
              sx={{ width: '100%' }}
              label={label.simNo}
              value={sim.simNo || ''}
              size="small"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSim({
                  ...sim,
                  simNo: e.target.value.trim() == ''
                    ? ''
                    : e.target.value
                })
              }
              onBlur={() => handleFieldBlur('simNo')}
              error={hasError(`simNo`, errors)}
              helperText={getError(`simNo`, errors)}
            />
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
              <DateTimePicker
                disabled={!managerOrAdmin}
                sx={{ width: '100%' }}
                views={['year', 'month', 'day']}
                label={label.receiptDate}
                value={
                  dayjs(sim.receiptDate, dateViewFormat)
                }
                onChange={(value) =>
                  setSim({ ...sim, receiptDate: dayjs(value).format(dateViewFormat) })
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
          <Stack direction={"row"} spacing={1}>
            <FormControlLabel
              label={label.provisioning}
              control={
                <Checkbox
                  disabled={!userORManagerOrAdmin}
                  checked={sim.provisioning}
                  onChange={({ target: { checked } }) =>
                    setSim({ ...sim, provisioning: checked })
                  }
                />
              }
            />
            <FormControlLabel
              label={label.smsGW}
              control={
                <Checkbox
                  disabled={!userORManagerOrAdmin}
                  checked={sim.smsGW}
                  onChange={({ target: { checked } }) =>
                    setSim({ ...sim, smsGW: checked })
                  }
                />
              }
            />
          </Stack>
          <EditOwnerFields
            <ISim>
            equipment={sim}
            startEditEquipment={props.startEditSim}
            setEquipment={setSim}
            errors={errors}
            canEdit={userORManagerOrAdmin}
          />
          <TextField
            disabled={!userORManagerOrAdmin}
            multiline
            rows={3}
            label={label.system}
            value={sim.system || ''}
            size="small"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSim({ ...sim, system: e.target.value })
            }
            onBlur={() => handleFieldBlur('system')}
          />
          <TextField
            disabled={!userORManagerOrAdmin}
            multiline
            rows={3}
            label={label.note}
            value={sim.note || ''}
            size="small"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSim({ ...sim, note: e.target.value })
            }
            onBlur={() => handleFieldBlur('note')}
          />
          {sim.dataDelete != undefined &&
            <p>
              {`${label.deleteComment}: ${sim.deleteComment}`}
            </p>
          }
        </Stack>
      </Stack>
      <Stack direction={"row"} spacing={2}>
        {(userORManagerOrAdmin) &&
          <CustomButton
            type={"submit"}
            title={label.save}
          />
        }
        <EquipmentDeleteButton title={label.deleteTitle} onDelete={handleDelete} equipment={sim}/>
        <AgreementDeleteButton equipment={sim} onAgreement={handleAgreement}/>
      </Stack>
    </Stack>
  )
};

export default EditSimBox;