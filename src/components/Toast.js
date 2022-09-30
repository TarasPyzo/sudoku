import React from 'react';

import '../styles/Toast.css';

function Toast({ isError, isCompleted }) {
  return (
    <div className="toast">
      {isError && <div className="toast-error">Oops. Something is wrong!</div>}
      {isCompleted && <div className="toast-success">Completed!</div>}
    </div>
  );
}

export default Toast;
