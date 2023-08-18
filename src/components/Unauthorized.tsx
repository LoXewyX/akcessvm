import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';

const Unauthorized: React.FC = () => {
  const { t } = useTranslation('global');
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    document.title = t('unauth.title');
  }, [t]);

  return (
    <div>
      <Sidebar />
      <section>
        <h1>403 - {t('unauth.head')}</h1>
        <br />
        <p>{t('unauth.body')}</p>
        <div className="flexGrow">
          <button className="btn btn-primary" onClick={goBack}>
            {t('unauth.button')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Unauthorized;