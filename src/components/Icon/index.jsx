import React from 'react';
import PropTypes from 'prop-types';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import styled from 'styled-components';

function Icon({ type, onClick, label }) {
  switch (type) {
    case 'file':
      return (
        <div>
          <IconContainer><DescriptionIcon onClick={onClick} style={{ fontSize: '2.5rem' }} /></IconContainer>
          <Label>{label}</Label>
        </div>
      );
    case 'dir':
      return (
        <div>
          <IconContainer><FolderIcon onClick={onClick} style={{ fontSize: '2.5rem' }}/></IconContainer>
          <Label>{label}</Label>
        </div>
      );
  }
}

const IconContainer = styled.div`
  text-align: center;
`;
const Label = styled.div`
  text-align: center;
  word-break: break-word;
`;
Icon.propTypes = {
  type: PropTypes.oneOf(['file', 'dir']).isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
export default Icon;
