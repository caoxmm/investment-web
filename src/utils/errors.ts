export enum ErrorCode {
  NeedsCompilation = 'NeedsCompilation',
  AlreadyDeployed = 'AlreadyDeployed',
  InvalidInput = 'InvalidInput',
  InvalidState = 'InvalidState',
  InternalServerError = 'InternalServerError',
  DependencyError = 'DependencyError',
  PluginError = 'PluginError',
}

export class SimpleError<T> extends Error {
  public code: ErrorCode;

  public data?: T;

  public constructor(message: string, code: ErrorCode, data?: T) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.data = data;
  }
}
