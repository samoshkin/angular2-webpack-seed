import { Transaction } from './transaction';

function createActionFilter(whitelist) {
  return action => whitelist.some(x => {
    if (typeof x === 'string') {
      return action.type === x;
    }

    if (typeof x === 'object' && typeof x.type === 'string') {
      return action.type === x.type;
    }

    if (typeof x === 'function') {
      return x(action);
    }

    throw new Error(`Unknown predicate: ${JSON.stringify(x)}`);
  });
}


export function actionFilterReducer(...whitelist) {
  const actionFilter = createActionFilter(whitelist);
  return reducer => (state, action) => actionFilter(action)
    ? reducer(state, action)
    : state;
}

export function when(...args) {
  const whitelist = args.slice(0, args.length - 1);
  const reducer = args[args.length - 1];

  return actionFilterReducer(...whitelist)(reducer);
}

export const child = ({ type: parentType }, childType) => {
  const fullyQualifiedType = Transaction.buildChildType(parentType, childType);
  return action => action.type === fullyQualifiedType;
};
export const success = x => child(x, 'success');
export const error = x => child(x, 'error');
export const progress = x => child(x, 'progress');

export const children = ({ type: parentType }) => action =>
  action.type.startsWith(parentType + '/');

export const childrenAndSelf = ({ type: parentType }) => action =>
  action.type.startsWith(parentType);

