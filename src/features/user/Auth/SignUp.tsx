import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useSignUpEmailPassword } from '@nhost/react'
import {
  Form,
  FormError,
  FormInput,
  FormLabel,
  FormReset,
  FormSubmit,
  useFormState,
} from 'ariakit/form'
import styles from './Auth.module.scss'

type SignUpProps = {}

export const SignUp: FC<SignUpProps> = () => {
  const { signUpEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error } =
    useSignUpEmailPassword()

  const form = useFormState({
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
  })

  if (isSuccess) {
    return <Navigate to="/" replace={true} />
  }

  form.useSubmit(async () => {
    const { firstName, lastName, email, password } = form.values
    signUpEmailPassword(email, password, {
      displayName: `${firstName} ${lastName}`.trim(),
      metadata: {
        firstName,
        lastName,
      },
    })
  })

  const disableForm = isLoading || needsEmailVerification

  return (
    <div>
      <Form state={form} aria-labelledby="sign-up-form" className="wrapper">
        <h2 id="sign-up-form" className="heading">
          Create new account
        </h2>
        <div className="field">
          <FormLabel name={form.names.firstName}>Name</FormLabel>
          <FormInput name={form.names.firstName} required placeholder="John Doe" />
          <FormError name={form.names.firstName} className="error" />
        </div>
        <div className="field">
          <FormLabel name={form.names.lastName}>Name</FormLabel>
          <FormInput name={form.names.lastName} required placeholder="John Doe" />
          <FormError name={form.names.lastName} className="error" />
        </div>
        <div className="field">
          <FormLabel name={form.names.email}>Email</FormLabel>
          <FormInput
            type="email"
            name={form.names.email}
            required
            placeholder="johndoe@example.com"
          />
          <FormError name={form.names.email} className="error" />
        </div>
        <div className="field">
          <FormLabel name={form.names.password}>Password</FormLabel>
          <FormInput
            type="password"
            name={form.names.password}
            required
            placeholder="Input your password"
          />
          <FormError name={form.names.password} className="error" />
        </div>
        <div className="buttons">
          <FormReset className="button secondary reset">Reset</FormReset>
          <FormSubmit className="button" disabled={disableForm}>
            {isLoading ? <span>LOADING...</span> : 'Create account'}
          </FormSubmit>
        </div>

        {isError ? <p className="error-text">{error?.message}</p> : null}
      </Form>
    </div>
  )
}
