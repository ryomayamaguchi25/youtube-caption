import React, { useState } from "react";

const LangSelect = (props) => {
  const langOpt = props.langOpt;
  const onChange = props.onChange;
  const options = langOpt.map(option =>
    <option value={option} key={option}>{option}</option>
  )
  const selectorWrap = (() => {
    const selectors = [];
    for (let i = 0; i < props.amount; i++) {
      selectors.push(
        <select key={i} lang-no={i + 1} onChange={onChange}>
          <option default>Select</option>
          {options}
        </select>
      )
    }
    return selectors;
  })
  return (
    selectorWrap()
  );
};

export default LangSelect;