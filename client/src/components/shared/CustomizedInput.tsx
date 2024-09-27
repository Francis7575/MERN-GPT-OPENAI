import TextField from "@mui/material/TextField";

type CustomInputProps = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = ({ name, type, label }: CustomInputProps) => {
  return (
    <TextField
      margin="normal"
      name={name}
      label={label}
      type={type}
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