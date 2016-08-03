import { connectActionsToHandlers } from './connect-actions-to-handlers';
import { APP_INITIALIZER, OpaqueToken } from '@angular/core';
import { StateUpdates } from '@ngrx/effects';
import { Store } from '@ngrx/store';

function flatten(list: any[]): any[] {
  return list.reduce((items: any[], next) => {
    if (Array.isArray(next)) {
      return items.concat(flatten(next));
    }

    return items.concat(next);
  }, []);
}

export const ACTION_HANDLERS = new OpaqueToken('ACTION_HANDLERS');

export function provideActionHandlers(...actionHandlers: any[]) {
  const allHandlers = flatten(actionHandlers);

  return [
    ...allHandlers,
    ...allHandlers.map(handlerClass => ({
      provide: ACTION_HANDLERS,
      multi: true,
      useExisting: handlerClass
    })),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [Store, StateUpdates, ACTION_HANDLERS],
      useFactory: connectActionsToHandlers
    }
  ];
}


