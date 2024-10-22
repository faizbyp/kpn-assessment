import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectCtrl = ({
  name,
  label,
  control,
  rules,
  defaultValue,
  children,
  onChangeOvr,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props} fullWidth sx={{ mb: 2 }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <Select
              labelId={labelId}
              label={label}
              value={value}
              onChange={(e) => {
                onChange(e);
                if (onChangeOvr !== undefined) {
                  onChangeOvr(e);
                }
              }}
              error={!!error}
            >
              {children}
            </Select>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  );
};
export default SelectCtrl;
