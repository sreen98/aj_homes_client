import * as React from 'react';
import { Typography } from '@mui/material';
import messages from './messages';

const CopyRightText = () => {
  return (
    <>
      {messages.copyright}
      {messages.ajHomes}
      {`${new Date().getFullYear()}.`}
    </>
  );
};

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <CopyRightText />
    </Typography>
  );
}
export default Copyright;
