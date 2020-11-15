import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Footer from 'components/Footer';
import styled from '@emotion/styled';

const LayoutContainer = styled(`div`)`
  padding: 25px 20%;
`;

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        <LayoutContainer>{children}</LayoutContainer>
      </main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
