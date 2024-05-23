import { FieldProps } from 'formik';
import React from 'react';

interface InputFieldProps extends FieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  className?: string;
  extraFeedback?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  field,
  form: { touched, errors },
  id,
  label,
  type,
  placeholder,
  className,
  extraFeedback,
}) => {
  const inputClasses = `mt-1 w-full rounded-md border border-secondary bg-primary px-3 py-2 text-secondary shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-btn ${className || ''}`;

  const errorMessage =
    touched[field.name] && errors[field.name] ? errors[field.name] : undefined;
  const error = typeof errorMessage === 'string' ? errorMessage : undefined;

  console.log('Rendering InputField with extraFeedback:', extraFeedback);

  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-secondary'>
        {label}
      </label>
      <input
        {...field}
        type={type}
        id={id}
        placeholder={placeholder}
        className={inputClasses}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className='mt-2 text-sm text-red-600'>
          {error}
        </p>
      )}
      {extraFeedback && (
        <p className='mt-1 text-sm text-blue-600'>{extraFeedback}</p>
      )}
    </div>
  );
};
