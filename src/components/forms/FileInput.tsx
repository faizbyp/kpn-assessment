import { ChangeEvent, ReactNode, useRef } from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { Button, Box, Typography, FormHelperText, IconButton } from "@mui/material";

interface FileInputProps {
  control: any;
  name: string;
  text: string;
  rules?: RegisterOptions;
  startIcon?: ReactNode;
  withHelper?: boolean;
  fullWidth?: boolean;
  noMargin?: boolean;
  floating?: boolean;
  icon?: ReactNode;
  passFile?: (file: File) => void;
  accept?: string;
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
  floating,
  icon,
  passFile,
  accept,
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
              accept={accept}
              onChange={(e: ChangeEvent<HTMLInputElement> | null) => {
                if (!e || !e.target.files) return;
                onChange(e.target.files[0]); // Set the file object
                passFile && passFile(e.target.files[0]);
              }}
              onBlur={onBlur}
              ref={inputRef}
              style={{ display: "none" }} // Hide the default input
            />
            {icon ? (
              <IconButton
                sx={floating ? { position: "absolute", top: 0, left: 0 } : undefined}
                onClick={() => inputRef.current?.click()}
              >
                {icon}
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                color={error && "error"}
                onClick={() => inputRef.current?.click()} // Safely trigger the file input
                sx={
                  floating
                    ? { position: "absolute", top: 0, left: 0 }
                    : { marginRight: withHelper ? 1 : 0 }
                }
                startIcon={startIcon}
                fullWidth={fullWidth}
              >
                {text}
              </Button>
            )}
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
