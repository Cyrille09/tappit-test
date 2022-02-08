import React from 'react';
import classnames from 'classnames';
import { Field } from 'formik';
import styles from './fields.module.scss';

export function Toggle({ className = null, label, required, type, id, name }) {
  return (
    <div className={classnames(styles.field, className)}>
      {label && (
        <label htmlFor={id || name} className={styles.label}>
          {label} {}
          {required}
        </label>
      )}

      <label className={classnames(styles.inputToggle, styles.switch)}>
        <Field type={type} id={id} name={name} />
        <span className={classnames(styles.slider, styles.round)}></span>
      </label>
    </div>
  );
}
