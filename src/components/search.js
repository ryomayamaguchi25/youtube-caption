import React, { useState } from "react";
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 400,
  },
  form: {
    display: 'flex',
    width: 400,
    margin: 'auto'
  },
  urlInput: {
    padding: 6,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = (props) => {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.getVideoId(searchValue);
    // resetInputField();
  };

  return (

    <Paper className='search' component='form' justify='center' className={classes.form}>
      {/* <input
        value={searchValue}
        // value='https://www.youtube.com/watch?v=_F7iIkHF4u8'
        onChange={handleSearchInputChanges}
        type="text"
      /> */}
      <InputBase
        defaultValue='https://www.youtube.com/watch?v=8rry2jde8j0'
        className={classes.urlInput}
        fullWidth
        onChange={handleSearchInputChanges}
        placeholder=" Search YoutubeVideo ID"
        inputProps={{ 'aria-label': 'Search YoutubeVideo URL or ID' }}
      />
      <IconButton onClick={callSearchFunction} type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
      {/* <input onClick={callSearchFunction} type="submit" value="SEARCH" /> */}
    </Paper>
  );
};

export default Search;