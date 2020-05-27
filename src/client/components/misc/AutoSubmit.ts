import { useFormikContext } from 'formik';
import { useEffect } from 'react';

export const AutoSubmit = () => {
  // Grab values and submitForm from context
  const { values, submitForm } = useFormikContext();
  useEffect(() => {
    submitForm();
  }, [values, submitForm]);
  return null;
};
