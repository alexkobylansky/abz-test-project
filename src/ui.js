import {vars} from "./vars";
import { styled } from '@mui/material/styles';
import {Button} from "@mui/material";

export const PrimaryButton = styled(Button)({
  width: 100,
    height: 38,
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: 400,
    borderRadius: 80,
    backgroundColor: vars.primaryBackgroundColorYellow,
    color: vars.blackTextColor,
    textTransform: "unset",
    '&:hover': {
    backgroundColor: vars.hoverBackgroundColorYellow,
  },
  '&:disabled': {
    backgroundColor: vars.disabledButtonColor,
      color: vars.whiteTextColor
  }
})