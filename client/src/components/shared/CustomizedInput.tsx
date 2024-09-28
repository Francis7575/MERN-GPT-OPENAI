import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

type CustomInputProps = {
  name: string;
  type: string;
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string
};

const CustomizedInput = ({ name, type, label, onChange, value }: CustomInputProps) => {
  return (
    <TextField
      margin="normal"
      name={name}
      label={label}
      type={type}
      onChange={onChange}
      value={value}
      sx={{
        borderRadius: 10,
        fontSize: 20,
        maxWidth: "450px",
        margin: "0 auto",
        width: "100%",
        "& .MuiInputBase-input": {
          color: "white",
        },
      }}
    />
  );
};

export default CustomizedInput;