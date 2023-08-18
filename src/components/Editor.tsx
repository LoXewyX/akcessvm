import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';

const Editor: React.FC = () => {
  const { t } = useTranslation('global');

  useEffect(() => {
    document.title = t('editor.title');
  }, [t]);

  return (
    <div>
      <Sidebar />
      <section>
        <h1>{t('editor.head')}</h1>
        <br />
        <p>{t('editor.body')}</p>
      </section>
    </div>
  );
};

export default Editor;