const logMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  console.log(`Action: ${ action.type }`, action.payload, getState());
  next(action);
};

export default logMiddleware;
