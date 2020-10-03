export default {
  namespace: 'app',
  state: {
    user: null,
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    async login({ payload }, { dispatch }) {
      await new Promise(resolve => setTimeout(() => resolve(), 1000));

      await dispatch({
        type: 'updateUser',
        payload,
      });

      return { payload };
    },

    async updateUser({ payload }, { dispatch }) {
      dispatch({
        type: 'updateState',
        payload: {
          user: payload,
        },
      });
    },
  },
};
