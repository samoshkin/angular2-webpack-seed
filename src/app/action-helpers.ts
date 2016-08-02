export const createAction = function(type) {
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
}

export const createSubAction = function sub(parentAction, subType) {
  const type = parentAction.type + '/' + subType;
  const isActionObject = typeof parentAction.payload !== 'undefined';

  function actionCreator(payload, meta) {
    return {
      type,
      payload,
      meta: isActionObject
        ? Object.assign({}, parentAction.meta, meta)
        : meta
    };
  }

  return Object.assign(actionCreator, {
    type,
    toString() { return type; },
  });
};

export const error = x => createSubAction(x, 'error');
export const progress = x => createSubAction(x, 'progress');
export const success = x => createSubAction(x, 'success');
