const HANDLERS_KEY = '@ActionHandler/handlers';
const HANDLER_KEY = '@ActionHandler/handler';

export function ActionHandler(actionOrType) {
  const actionType = typeof actionOrType === 'string'
    ? actionOrType
    : actionOrType.type;
  return (target: any, key: string) => {
    const handlers = Reflect.getOwnMetadata(HANDLERS_KEY, target) || [];
    Reflect.defineMetadata(HANDLERS_KEY, [...handlers, key], target);
    Reflect.defineMetadata(HANDLER_KEY, { actionType, handlerKey: key }, target, key);
  };
}

export function getHandlersMetadata(instance: any) {
  const proto = Object.getPrototypeOf(instance);

  const methods = Reflect.getOwnMetadata(HANDLERS_KEY, proto);
  if (!methods) {
    return [];
  }
  return methods.map(m => Reflect.getOwnMetadata(HANDLER_KEY, proto, m));
}
