interface FSA {
  type: string;
  payload: any;
  meta?: any;
}

interface ActionCreator {
  (payload: any, meta: any): FSA;
  type: string;
}

export const createAction = function (type) {
  function actionCreator(payload, meta) {
    return {
      type,
      payload,
      meta
    };
  }

  return Object.assign(actionCreator, {
    type,
    toString() { return type; },
  });
};
