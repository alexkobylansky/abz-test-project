import React from "react";
import {vars} from "../vars";
import {styled} from '@mui/material/styles';
import {TextField} from "@mui/material";

const CustomField = styled(TextField)({
  width: "100%",
  height: "54px",

  "& label": {
    fontFamily: "Nunito, sans-serif",
    fontSize: "16px",
    lineHeight: "1.6",
    fontWeight: "400",
    color: vars.greyTextColor,
  },
  "& label.Mui-focused": {
    color: vars.greyTextColor,
  },
  "& label.Mui-error": {
    color: vars.redErrorColor
  },
  "& label.Mui-error.Mui-focused": {
    color: vars.redErrorColor
  },
  "& input": {
    fontFamily: "Nunito, sans-serif",
    fontSize: "16px",
    lineHeight: "1.6",
    fontWeight: "400",
    color: vars.blackTextColor,
    padding: "15.5px 14px",
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${vars.greyBorderColor}`,
    borderRadius: "4px",
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${vars.redErrorColor}`
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${vars.greyBorderColor}`,
    borderRadius: "4px",
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${vars.redErrorColor}`
  },
  "& .MuiFormHelperText-root": {
    marginTop: "4px",
    marginRight: "16px",
    lineHeight: "16px",
    color: vars.greyTextColor,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: vars.redErrorColor,
  },
});

interface InputFieldProps {
  className?: string;
  type: string;
  label: string;
  disabled?: boolean;
  value: string;
  sx?: Array<()=> | object | boolean> | object;
  helperText: string;
  error: boolean;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant: 'filled' | 'outlined' | 'standard';
}

export const InputField: React.FC<InputFieldProps> = ({...props}) => {
  return (
    // @ts-ignore
    <CustomField {...props}/>
  )
}