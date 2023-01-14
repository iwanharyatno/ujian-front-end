import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export function ModalDialog({ children, show, header, onClose }) {
  return (
    <div className={'fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center ' + (show ? '' : 'hidden')} onClick={onClose}>
      <div className="bg-white rounded-lg w-1/2 divide-y" onClick={(e) => e.stopPropagation()}>
        <ModalHeader onClose={onClose}>
          {header}
        </ModalHeader>
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, onClose, ...rest }) {
  return (
    <div className="flex items-center justify-between p-3">
      {children}
      <button className="px-4 pt-4 pb-3 text-xl" onClick={onClose}>
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
}

export function ModalSegment({ children, className, ...rest }) {
  return (
    <div className={'p-4 ' + className} {...rest}>
      {children}
    </div>
  );
}
