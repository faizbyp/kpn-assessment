"use client";

import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { Controller, RegisterOptions } from "react-hook-form";

interface CheckboxProps {
  name: string;
  control: any;
  label: string;
  rules?: RegisterOptions;
  defaultValue?: string;
  noMargin?: boolean;
}

const CheckboxCtrl = ({ name, control, label, rules, defaultValue, noMargin }: CheckboxProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            sx={{
              m: noMargin ? 0 : undefined,
              color: !field.value ? "silver" : undefined,
            }}
            label={label}
          />
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </>
      )}
    />
  );
};

export default CheckboxCtrl;
