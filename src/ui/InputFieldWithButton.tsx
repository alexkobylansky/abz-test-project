import React from "react";
import {vars} from "../vars";
import {styled} from '@mui/material/styles';
import {Button} from "@mui/material";
import {InputField} from "./InputField";

const inputWrapperStyles:  React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  marginBottom: "50px",
}

const CustomButton = styled(Button)({
  width: 83,
  height: 54,
  border: `1px solid ${vars.blackTextColor}`,
  borderRadius: "4px 0 0 4px",
  fontFamily: "inherit",
  textTransform: "unset",
  color: vars.blackTextColor,
  backgroundColor: "transparent",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  "&.Mui-error": {
    border: `2px solid ${vars.redErrorColor}`,
  }
});

const inputFieldStyles = {
  width: "auto",
  flexGrow: "1",
  "& .MuiInputBase-root.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${vars.greyBorderColor}`,
    borderRadius: "0 4px 4px 0",
    borderLeft: "none",
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${vars.greyBorderColor}`,
    borderRadius: "0 4px 4px 0",
    borderLeft: "none",
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${vars.redErrorColor}`,
    borderLeft: "none",
    top: "-4.7px",
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${vars.redErrorColor}`,
    borderLeft: "none",
    top: "-4.7px",
  },
}

interface InputFieldWithButtonProps {
  type: string;
  name: string;
  label: string;
  error: boolean;
  helperText: string;
  getImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const InputFieldWithButton: React.FC<InputFieldWithButtonProps> = ({type, name, label, error, helperText, getImage, value}) => {

  return (
    <div className="inputWrapper" style={inputWrapperStyles}>
      {/*@ts-ignore*/}
      <CustomButton className={error ? "Mui-error" : ""} variant="contained" component="label">
        Upload
        <input hidden accept="image/jpeg, image/jpg" multiple onChange={getImage} type="file" name={name}/>
      </CustomButton>
      <InputField type={type} name={""} variant={"outlined"} label={label} disabled value={value} sx={inputFieldStyles} helperText={helperText} error={error}/>
    </div>
  )
}