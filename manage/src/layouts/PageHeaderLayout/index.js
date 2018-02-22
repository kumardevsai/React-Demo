import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import styles from './index.scss';

export default ({ children, wrapperClassName, top, ...resetProps }) => (
  <div style={{ margin: '-24px -24px 0'}} className={wrapperClassName}>
    {top}
    <PageHeader key="pageheader" {...resetProps} linkElement={Link} />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);