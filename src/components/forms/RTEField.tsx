import { Controller, RegisterOptions } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RTEProps {
  control: any;
  name: string;
  rules?: RegisterOptions;
  placeholder?: string;
}

const RTEField = ({ control, name, rules, placeholder = "Write Description" }: RTEProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <ReactQuill
          {...field}
          placeholder={placeholder}
          onChange={(text: string) => {
            field.onChange(text);
          }}
        />
      )}
    />
  );
};
export default RTEField;
