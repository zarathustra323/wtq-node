import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Alert } from 'reactstrap';

import DefaultLayout from '../layouts/Default';
import WordForm from '../components/FormWord';

const createWord = gql`
mutation CreateWord($input: CreateWordInput!) {
  createWord(input: $input) {
    id
    name
    slug
  }
}
`;

const CreateWordPage = () => (
  <DefaultLayout>
    <Head>
      <title>Create Word</title>
    </Head>
    <h1>Add a Word</h1>
    <WordForm />
  </DefaultLayout>
);

export default CreateWordPage;
