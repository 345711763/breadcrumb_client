import React, { useCallback, useEffect, useState} from 'react';
import Nav from "./components/Nav";
import styled from 'styled-components';
import File from "./components/File";
import Icon from "./components/Icon";
import {joinPath} from "./helpers/joinPath";

const BASE_URL = 'http://localhost:3000';
const GET_PATH_URL = `${BASE_URL}/path`;
const FILE = 'file';
const DIR = 'dir';

function App() {
  const [path, setPath] = useState('');
  const [pathInfo, setPathInfo] = useState({});
  const onLinkClicked = useCallback((path) => {
    setPath(path);
  }, []);

  const getFile = useCallback(() => {
    const lastIndex = path.lastIndexOf("/");
    if (lastIndex !== -1) {
      return <File fileName={path.slice(lastIndex + 1)}/>;
    }
    return null;
  }, [path])
  const getDir = useCallback(() => {
    let dir = [];
    if (pathInfo && typeof pathInfo.children === 'object') {
      for (let key in pathInfo.children) {
        if (pathInfo.children.hasOwnProperty(key)) {
          let child = pathInfo.children[key];
          dir.push(
            <ListItem key={key}>
              <Icon onClick={() => setPath(joinPath(path, key))} label={key} type={child.type}/>
            </ListItem>
          )
        }
      }
    }
    return dir;
  }, [path, pathInfo])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${GET_PATH_URL}/${path}`);
      const data = await response.json();
      setPathInfo(data);
    }
    fetchData();
  }, [path])
  return (
    <div>
      <Nav path={path} onClick={onLinkClicked}/>
      <Container>
        {pathInfo.type === FILE ? getFile() : null}
        {pathInfo.type === DIR ? getDir() : null}
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ListItem = styled.div`
  margin: 1rem;
  width: 60px;
`;

export default App;
