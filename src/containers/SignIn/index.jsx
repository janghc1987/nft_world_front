import { useEffect } from 'react';

import { handleTitle } from '../../utils';

import NavbarLast from '../../layouts/Head/NavbarLast';

import SecHeader from './SecHeader';
import SecForm from './SecForm';

const SignInContainer = () => {
  useEffect(() => {
    handleTitle('SignIn');
  }, []);

  return (
    <>
      <NavbarLast />
      <section className="h-100-vh mb-8">
        <SecHeader />

        <div className="container">
          <div
            className="row mt-lg-n10 mt-md-n11 mt-n10"
            style={{ marginTop: '-10rem' }}
          >
            <SecForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignInContainer;
