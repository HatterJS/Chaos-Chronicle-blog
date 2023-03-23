import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import NotFound from '../NonFound';

import { fetchConfirmEmail } from '../../redux/slices/authorization';

function EmailConfirmation() {
  //dispatch for redux
  const dispatch = useDispatch();
  //token from route
  const { id } = useParams();
  //navigate to main page after confirmation
  const navigate = useNavigate();
  React.useEffect(() => {
    localStorage.setItem('token', id);
    dispatch(fetchConfirmEmail());
    navigate('/');
  }, [dispatch, navigate, id]);
  return (
    <div className="emailConfirmation">
      <PageTitle title="Підтвердження E-mail" />
      <NotFound />
    </div>
  );
}

export default EmailConfirmation;
