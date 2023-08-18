import React, { useEffect } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading: React.FC = () => {
  useEffect(() => {
    document.title = 'Loading';
  }, []);

  return (
    <div className="flex-center">
      <FontAwesomeIcon className="spin-inf" icon={faSpinner} />
    </div>
  );
};

export default Loading;