import React from 'react';
import Head from 'next/head';

import DefaultLayout from '../layouts/Default';

export default () => (
  <DefaultLayout>
    <Head>
      <title>Homepage</title>
    </Head>
    <h1>Hello World!</h1>
  </DefaultLayout>
);
