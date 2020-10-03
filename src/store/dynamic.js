import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

function Loading({ error, pastDelay, timeOut }) {
  const retry = () => {};
  if (error) {
    console.error(error);

    return (
      <div>
        <p>加载失败</p>
        <button onClick={retry} type="button">
          重试
        </button>
      </div>
    );
  }
  if (timeOut) {
    return (
      <div>
        <p>加载超时</p>
        <button onClick={retry} type="button">
          重试
        </button>
      </div>
    );
  }
  if (pastDelay) {
    return <div>加载中...</div>;
  }

  return null;
}

Loading.propTypes = {
  error: PropTypes.object,
  pastDelay: PropTypes.bool,
  timeOut: PropTypes.bool,
};

export default function({ store, component, models: m = () => [] }) {
  return Loadable.Map({
    loader: {
      Component: component,
      models: () => Promise.all(m()),
    },
    loading: Loading,
    timeout: 10000,
    render(loaded, props) {
      const { Component, models } = loaded;

      models.forEach(model => {
        store.injectModel(model.default.namespace, model.default);
      });

      return <Component.default {...props} />;
    },
  });
}
