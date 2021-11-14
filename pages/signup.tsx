import { useAuth } from '@hooks/useAuth';
import type { NextPage } from 'next';
import { ChangeEvent, useCallback, useState } from 'react';

export interface SignUpPageProps {}

const SignUpPage: NextPage = (props: SignUpPageProps) => {
  const [state, setState] = useState({ email: '', password: '' });
  const { signup } = useAuth();

  const onSubmit = useCallback(
    async (ev: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
      ev.preventDefault();
      await signup({
        email,
        password,
        config: {
          redirectTo: '/',
        },
      });
    },
    [signup]
  );

  const onChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={async (ev) => await onSubmit(ev, state.email, state.password)}>
        <div>
          <label htmlFor="email">Email:</label>
          <br />
          <input onChange={onChange} id="email" name="email" type="email" value={state.email} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            onChange={onChange}
            id="password"
            name="password"
            type="password"
            value={state.password}
            minLength={8}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
