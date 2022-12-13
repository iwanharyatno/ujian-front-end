import { useRouteError } from 'react-router-dom';
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle as errorIcon } from '@fortawesome/free-solid-svg-icons';

export default function ErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    document.title = `Error: ${error.status} - ${error.statusText}`;
  });

  return (
    <div className="flex fixed justify-center items-center w-full h-full flex-col">
      <h1 className="text-4xl mb-4 text-blue-400 font-bold">Ups!</h1>
      <FontAwesomeIcon icon={errorIcon} className="text-5xl text-blue-400 mb-6" />
      <p className="mb-4 text-center max-w-24">{ getExtendedMessage(error.status) }</p>
      <p className="text-gray-400">{error.status} | {error.statusText}</p>
    </div>
  );
}

function getExtendedMessage(errorStatus) {
  switch(errorStatus) {
    case 404:
      return 'Maaf, kami tidak bisa menemukan halaman yang dimaksud.';
      break;
    default:
      return 'Ada sesuatu yang salah';
  }
}
