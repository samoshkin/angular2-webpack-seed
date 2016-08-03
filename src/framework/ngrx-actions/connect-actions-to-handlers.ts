import { getHandlersMetadata } from './action-handler-metadata';
import { StateUpdates } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import { Subject } from 'rxjs/Subject';
import { Transaction } from './transaction';

export function connectActionsToHandlers(store: Store<any>, stateUpdates$: StateUpdates<any>, handlerObjects: any[]) {

  const toEffect = (handlerMetadata) => {
    const {
      handler,
      actionType
    } = handlerMetadata;

    return stateUpdates$
      .whenAction(actionType)
      .mergeMap(({ action, state }) => {
        const dispatcher = new Subject();
        const transaction = new Transaction(action);
        const handlerArgs = {
          action,
          state,
          state$: store,
          dispatcher,
          transaction
        };

        return Observable.fromPromise(handler(handlerArgs))
          .do(undefined, undefined, () => dispatcher.complete())
          .map(res => {
            console.log('map to success');
            return transaction.success(res);
          })
          .catch(err => {
            console.log('map to error');
            return Observable.of(transaction.error(err));
          })
          .merge(dispatcher);
      });
  }

  return function () {
    console.log('connect actions to handlers');
    handlerObjects
      .map(handlerObject => getHandlersMetadata(handlerObject)
        .map(handlerMetadata => ({
          handler: handlerObject[handlerMetadata.handlerKey].bind(handlerObject),
          actionType: handlerMetadata.actionType
        })))
      .reduce((curr, next) => curr.concat(next))
      .map(toEffect)
      .reduce((curr, next) => {
        return curr.merge(next);
      })
      .subscribe(store);

    return Promise.resolve(true);
  };
}
