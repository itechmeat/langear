import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useSignInEmailPassword } from '@nhost/react'
import { Form, FormError, FormInput, FormLabel, FormSubmit, useFormState } from 'ariakit/form'
import styles from './Auth.module.scss'

type SignInProps = {}

export const SignIn: FC<SignInProps> = () => {
  const { signInEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error } =
    useSignInEmailPassword()

  const form = useFormState({
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
  })

  if (isSuccess) {
    return <Navigate to="/" replace={true} />
  }

  form.useSubmit(async () => {
    const { email, password } = form.values
    signInEmailPassword(email, password)
  })

  const disableForm = isLoading || needsEmailVerification

  return (
    <div>
      <Form state={form} aria-labelledby="sign-in-form" className="wrapper">
        <h2 id="sign-in-form" className="heading">
          Sign In
        </h2>
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
          <FormSubmit className="button" disabled={disableForm}>
            {isLoading ? <span>LOADING...</span> : 'Sign In'}
          </FormSubmit>
        </div>

        {isError ? <p className="error-text">{error?.message}</p> : null}
      </Form>
    </div>
  )
}
