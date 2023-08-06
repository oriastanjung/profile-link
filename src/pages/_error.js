import React from 'react';

const ErrorPage = ({ statusCode }) => {
  return (
    <div>
      <h1>
        {statusCode
          ? `An error ${statusCode} occurred on the server`
          : 'An error occurred on the client'}
      </h1>
    </div>
  );
};

export default ErrorPage;