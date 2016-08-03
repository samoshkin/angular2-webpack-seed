export class Transaction {
  static buildChildType(parentType, childType) {
    return `${parentType}/${childType}`;
  }

  constructor(private parentAction) {
  }

  child(childType: string, payload: any, meta?: any) {
    return {
      type: Transaction.buildChildType(this.parentAction.type, childType),
      payload,
      meta: Object.assign(
        {
          transaction: this.parentAction,
        },
        meta)
    };
  }

  success(payload: any, meta?: any) {
    return this.child('success', payload, meta);
  }

  error(payload: any, meta?: any) {
    return this.child('error', payload, meta);
  }

  progress(payload: any, meta?: any) {
    return this.child('progress', payload, meta);
  }
}
