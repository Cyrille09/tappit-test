import React from 'react';
import { Field } from 'formik';
import styles from './fields.module.scss';

export function Checkbox({ type, id, name, value }) {
  return (
    <>
      <label>
        <Field type={type} name={name} id={id} />
        <i className={styles.valueTitle}>{value}</i>
      </label>
    </>
  );
}
