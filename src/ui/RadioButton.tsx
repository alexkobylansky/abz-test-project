import React from "react";
import {vars} from "../vars";
import { styled } from '@mui/material/styles';
import {FormControlLabel, Radio} from '@mui/material';

const BpIcon = styled('span')({
  position: "relative",
  border: `1px solid ${vars.greyBorderColor}`,
  borderRadius: '50%',
  width: 20,
  height: 20,
});

const BpCheckedIcon = styled(BpIcon)({
  borderColor: vars.secondaryColorBlue,

  '&:before': {
    content: '""',
    display: 'block',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    width: 10,
    height: 10,
    backgroundColor: vars.secondaryColorBlue,
  }
});

const BpRadio: React.FC = (props) => {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
};

const CustomFormControlLabel = styled(FormControlLabel)({
  margin: "0 0 7px -3px",
  "&:last-of-type": {
    marginBottom: 0,
  },

  "& .MuiButtonBase-root.MuiRadio-root": {
    padding: 3,
    marginRight: 10,
  }
});

interface RadioButtonProps {
  value: number;
  label: string;
  name: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({value, label, name}) => {
  return (
    // @ts-ignore
    <CustomFormControlLabel value={value} control={<BpRadio name={name}/>} label={label} />
  );
}