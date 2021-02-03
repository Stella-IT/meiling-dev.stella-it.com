import React, { Fragment } from 'react';

import ContentWrapper from '../../templates/ContentWrapper';
import './Error.scss';

import {ReactComponent as IconError} from '../../../img/icon_error.svg';
import { RouteComponentProps } from 'react-router-dom';
import { MeilingV1ErrorResponse } from '../../../common/interface/error';
import { getMessageFromMeilingV1Error } from '../../../common/error';

interface Props extends RouteComponentProps<{
}> {
  
};

interface State {
  error?: MeilingV1ErrorResponse;
  redirect_uri?: string;
}

const Error: React.FC<Props> = ({
  location,
}) => {
  const state = (location.state as State)
  const error = state?.error;
  const redirectUri = state?.redirect_uri;

  console.error(state);

  return (
    <Fragment>
      <ContentWrapper
        pageName="error"
        progressDisabled
        content={
          <>
            <IconError />
            <h1>오류가 발생했습니다.</h1>
            <p>{error ? getMessageFromMeilingV1Error(error) : "알 수 없는 오류가 발생했습니다."}</p>

            <h3>Debug:</h3>
            <p>URL: {redirectUri}</p>
          </>
        }
      />
    </Fragment>
  );
}

export default Error;
