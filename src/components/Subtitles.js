import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Subtitles = (props) => {
  return (
    <div>aaaaa
      <Box>
        {props.subtitle1}
      </Box>
      <Box>
        {props.subtitle2}
      </Box>
    </div>
  );
};

export default Subtitles;