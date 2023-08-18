import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';

const Missing: React.FC = () => {
  const { t } = useTranslation('global');

  useEffect(() => {
    document.title = t('notfound.title');
  }, [t]);

  return (
    <div>
      <Sidebar />
      <section>
        <h1>404 - {t('notfound.head')}</h1>
        <p>{t('notfound.body')}</p>
        <div className="flexGrow">
          <Link className="btn btn-primary" to="/">
            {t('notfound.button')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Missing;