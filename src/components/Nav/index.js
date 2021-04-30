import React from 'react';
import { Link, Breadcrumbs, makeStyles } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {joinPath} from "../../helpers/joinPath";

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgb(10, 120, 185)',
    padding: '0.25rem',
    color: '#fff',
  },
  button: {
    fontSize: '1.25rem',
  },
});
const getLastFromArray = (array) => array[array.length - 1];
const renderRootLink = (onClick, classes, key) => <Link key={key} color="inherit" component="button" onClick={() => onClick('/')} classes={{ button: classes.button }}>root</Link>;
const formatLinkList = (path, onClick, classes) => {
  const pathNameList = path.split('/');
  if (path === '/') {
    return (renderRootLink(onClick, classes, '/'));
  }
  // structure: ['/home', '/home/file' ...]
  const dirList = ['/'];
  for (let i = 1; i < pathNameList.length; i++) {
    dirList.push(joinPath(dirList[i - 1], pathNameList[i]));
  }
  return (
    dirList.map((dir) => {
      if (dir === '/') {
        return renderRootLink(onClick, classes, dir);
      }
      return (
        <Link
          key={dir}
          color="inherit"
          component="button"
          onClick={() => onClick(dir)}
          classes={{ button: classes.button }}
        >
          {getLastFromArray(dir.split('/'))}
        </Link>
      );
    }));
};
const Nav = ({ path, onClick }) => {
  const classes = useStyles();
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      classes={{
        root: classes.root
      }}
    >
      {formatLinkList(path, onClick, classes)}
    </Breadcrumbs>
  );
}

export default Nav;
