import React, {ReactNode} from "react";
import {vars} from "../vars";
import {styled} from '@mui/material/styles';
import {Button} from "@mui/material";

const CustomButton = styled(Button)({
  minWidth: 100,
  height: 38,
  fontFamily: "Nunito, sans-serif",
  fontSize: 16,
  fontWeight: 400,
  borderRadius: 80,
  backgroundColor: vars.primaryBackgroundColorYellow,
  color: vars.blackTextColor,
  textTransform: "unset",
  padding: "4px 18px",
  '&:hover': {
    backgroundColor: vars.hoverBackgroundColorYellow,
  },
  '&:disabled': {
    backgroundColor: vars.disabledButtonColor,
    color: vars.whiteTextColor
  }
});

interface PrimaryButtonProps {
  type: "button" | "submit" | "reset" | undefined
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const PrimaryButton: React.FC<React.PropsWithChildren<PrimaryButtonProps>> = ({children, type, disabled, className, onClick, href}) => {
  return (
    <CustomButton type={type} disabled={disabled} className={className} onClick={onClick} href={href}>
      {children}
    </CustomButton>
  )
}