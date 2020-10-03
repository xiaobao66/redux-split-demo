import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import logoImg from 'assets/images/index/react.svg';
import styles from './index.scss?local';

function Home({ dispatch, history }) {
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);

    try {
      await dispatch({
        type: 'app/login',
        payload: { name: 'xiaobaowei' },
      });

      history.push({
        pathname: '/dashboard',
      });
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>React Skeleton</h1>
          <div>
            <Button type="primary" onClick={onLogin} loading={loading}>
              登录
            </Button>
          </div>
        </div>
        <div className={styles.logo}>
          <img src={logoImg} alt="" />
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  app: PropTypes.object,
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

export default connect(({ app }) => ({ app }))(Home);
