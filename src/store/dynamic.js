import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';

function Loading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return loading && <div>加载中...</div>;
}

export default function({ store, component, models: m = () => [] }) {
  const loader = () => {
    return Promise.all([component(), ...m()]).then(([c, ...models]) => {
      if (models.length > 0) {
        models.forEach(model => {
          store.injectModel(model.default.namespace, model.default);
        });
      }

      return c;
    });
  };

  const Component = loadable(loader, {
    fallback: <Loading />,
  });
  function DynamicWrapper({ ...props }) {
    return <Component {...props} />;
  }

  return DynamicWrapper;
}
