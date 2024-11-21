"use client";
import { TextField } from "@mui/material";
import { Controller, RegisterOptions } from "react-hook-form";

interface TextFieldProps {
  control: any;
  label: string;
  name: string;
  rules?: RegisterOptions;
  valueovr?: string;
  readOnly?: boolean;
  onChangeOvr?: (param: string) => void;
  toUpperCase?: boolean;
  toLowerCase?: boolean;
  numericInput?: boolean;
  multiline?: boolean;
  rows?: number | undefined;
  disabled?: boolean;
  endAdornment?: string | undefined;
  noMargin?: boolean;
  minRows?: number;
}

const TextFieldCtrl = ({
  control,
  label,
  name,
  rules,
  valueovr,
  readOnly,
  onChangeOvr,
  toUpperCase,
  toLowerCase,
  numericInput,
  multiline,
  rows,
  disabled,
  endAdornment,
  noMargin,
  minRows,
}: TextFieldProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={valueovr}
        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
          <TextField
            autoComplete="on"
            helperText={error ? error.message : null}
            error={!!error}
            onChange={(e) => {
              if (toUpperCase) {
                onChange(e.target.value.toUpperCase());
              } else if (toLowerCase) {
                onChange(e.target.value.toLowerCase());
              } else {
                onChange(e);
              }
            }}
            onBlur={(e) => {
              if (onChangeOvr !== undefined) {
                onChangeOvr(e.target.value);
              }
            }}
            inputRef={ref}
            value={value}
            label={label}
            variant="outlined"
            multiline={multiline}
            rows={rows}
            minRows={minRows}
            disabled={disabled}
            slotProps={{
              input: {
                readOnly: readOnly,
                inputMode: numericInput ? "numeric" : "text",
                endAdornment: endAdornment,
              },
            }}
            sx={{ mb: noMargin ? 0 : 2 }}
            fullWidth
          />
        )}
      />
    </>
  );
};

export default TextFieldCtrl;
