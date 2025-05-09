import React from 'react';

function ErrorMessages({ messagesInvalidForm }) {
  return (
    <div
      data-testid="error-message"
      role="alert"
      className="p-4 bg-red-600 text-white absolute rounded-md shadow-md right-[5%] top-[30%]"
    >
      <ul className="list-disc">
        {messagesInvalidForm.map((erroMessage, index) => (
          <li className="text-sm ml-4" key={index}>
            
            {erroMessage}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ErrorMessages;
