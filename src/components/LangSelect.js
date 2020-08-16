import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
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

const LangSelect = (props) => {
  const classes = useStyles();
  const langOpt = props.langOpt;
  const onChange = props.onChange;
  const options = langOpt.map(option =>
    <MenuItem value={option} key={option}>{option}</MenuItem>
    // <option value={option} key={option}>{option}</option>
  )
  const selectorWrap = (() => {
    const selectors = [];
    for (let i = 0; i < props.amount; i++) {
      selectors.push(
        // <span className='selectGroup'>
        //   <select key={i} lang-no={i + 1} onChange={onChange}>
        //     <option default>Select</option>
        //     {options}
        //   </select>
        // </span>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Language{i + 1}</InputLabel>
          <Select
            key={i} dataNo={i + 1}
            onChange={onChange.bind(this, i + 1)}
            label='language00'
          >
            {options}
          </Select>
        </FormControl>
      )
    }
    return selectors;
  })
  return (
    <Box display='flex' justifyContent="center">
      {selectorWrap()}
    </Box>
  );
};

export default LangSelect;