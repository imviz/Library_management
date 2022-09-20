import React from 'react'
import Snackbar from '@mui/material/Snackbar';

// common snackbar for reducing the code
const CommonSnackbar=({transition,open,onClose,values,message})=> {
 
  return (
    <div>
      <Snackbar      
      anchorOrigin={{
        vertical:'bottom',
        horizontal:'center'
      }}
        open={open}
        autoHideDuration={4000}
        onClose={onClose}
        TransitionComponent={transition}
        message={message}
        key={transition ? transition.name : ''}
      />
    </div>
  );
}

export default CommonSnackbar;