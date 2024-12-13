import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { Controller, RegisterOptions } from "react-hook-form";

interface CheckboxProps {
  name: string;
  control: any;
  label?: string;
  rules?: RegisterOptions;
  defaultValue?: string;
  noMargin?: boolean;
  color?: "error" | "primary" | "secondary" | "info" | "success" | "warning" | "default";
  disabled?: boolean;
}

const CheckboxCtrl = ({
  name,
  control,
  label,
  rules,
  defaultValue,
  noMargin,
  color,
  disabled,
}: CheckboxProps) => {
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
                color={color}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            disabled={disabled}
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
