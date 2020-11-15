import React from 'react';
import PropTypes from 'prop-types';

import QuestionDetail from 'containers/QuestionDetail';
import { withTranslation } from 'utils/with-i18next';

export class IndexPage extends React.PureComponent {
  render() {
    const { t } = this.props;

    return <QuestionDetail t={t} />;
  }
}

IndexPage.propTypes = {
  t: PropTypes.func,
};

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'banner', 'features'],
});

export default withTranslation('common')(IndexPage);
