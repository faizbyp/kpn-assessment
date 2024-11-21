import { ChangeEvent, ReactNode, useRef } from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { Button, Box, Typography, FormHelperText } from "@mui/material";

interface FileInputProps {
  control: any;
  name: string;
  text: string;
  rules?: RegisterOptions;
  startIcon?: ReactNode;
  withHelper?: boolean;
  fullWidth?: boolean;
  noMargin?: boolean;
}

const FileInput = ({
  control,
  name,
  rules,
  text,
  startIcon,
  withHelper,
  fullWidth,
  noMargin,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null); // Create a ref to the input

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Box sx={{ mb: noMargin ? 0 : 2 }}>
          <Box display="flex" alignItems="center">
            <input
              type="file"
              // accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement> | null) => {
                if (!e || !e.target.files) return;
                onChange(e.target.files[0]); // Set the file object
              }}
              onBlur={onBlur}
              ref={inputRef}
              style={{ display: "none" }} // Hide the default input
            />
            <Button
              variant="outlined"
              color={error && "error"}
              onClick={() => inputRef.current?.click()} // Safely trigger the file input
              sx={{ marginRight: withHelper ? 1 : 0 }} // Add some spacing between button and text
              startIcon={startIcon}
              fullWidth={fullWidth}
            >
              {text}
            </Button>
            {withHelper && (
              <Typography
                variant="body1"
                color={error ? "error.main" : value ? "text.primary" : "text.secondary"}
              >
                {value ? value.name : "No file selected"}
              </Typography>
            )}
          </Box>
          {error && (
            <FormHelperText error sx={{ mx: "14px" }}>
              {error.message} {/* Display error message */}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};

export default FileInput;
