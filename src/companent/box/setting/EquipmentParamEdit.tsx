import useSourceText from "../../../hooks/useSourceText.ts";
import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";
import { IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { SelectorINameId } from "../../SelectorINameId.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import CustomButton from "../button/CustomButton.tsx";
import { INameId } from "../../../interfaces/types.ts";
import {
  FetchArgs,
  FetchBaseQueryError,
  MutationActionCreatorResult,
  MutationDefinition
} from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";

interface Props<T extends INameId<D>, D extends string | number> extends PropsWithChildren {
  title: string
  label: string
  params?: T[]
  saveParam: (param: T) => MutationActionCreatorResult<MutationDefinition<T, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, any>, string, T, "middlewareApi">>
}

const EquipmentParamEdit = <T extends INameId<D>, D extends string | number>({
                                                                               title,
                                                                               label,
                                                                               params,
                                                                               saveParam,
                                                                               children
                                                                             }: Props<T, D>) => {
  const labels = useSourceText();
  const [param, setParam] = useState<T>()
  const handleSave = () => {
    param && saveParam(param).then(() => {
      setParam(undefined)
    })
  }
  useEffect(() => {
    setParam(undefined)
  }, [params]);

  return (
    <Stack spacing={2} sx={{ maxWidth: '200px', width: '100%' }}>
      <Typography variant="h6">
        {title}
      </Typography>
      {children}
      <SelectorINameId
        label={label}
        value={param?.id}
        items={params}
        setValue={(id) => {
          setParam(params?.find(param => param.id == id))
        }}
      />
      <TextField
        fullWidth
        label={labels.title}
        value={param?.name || ''}
        size="small"
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {param?.name && (
                  <IconButton onClick={() => setParam(undefined)}>
                    <ClearIcon/>
                  </IconButton>
                )}
              </InputAdornment>
            )
          }
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          e.target.value.length == 0
            ? setParam(undefined)
            : setParam({ ...param, name: e.target.value } as T)
        }
      />
      <CustomButton disabled={!param?.name || param?.name?.length == 0} onClick={handleSave}>
        {param?.id ? labels.edit : labels.add}
      </CustomButton>
    </Stack>
  );
};

export default EquipmentParamEdit;