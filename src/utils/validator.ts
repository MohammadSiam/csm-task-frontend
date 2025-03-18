// profileSchema.ts
import * as Yup from 'yup';

export const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  lastName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  content: Yup.array()
    .of(
      Yup.string()
        .matches(
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
          'Must be a valid YouTube URL',
        )
        .required('YouTube URL is required'),
    )
    .min(1, 'At least one YouTube link is required')
    .notRequired(),
});

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short!')
    .required('First name is required'),
  lastName: Yup.string().min(2, 'Too short!').required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
