interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

interface ErrorConstructor extends ErrorStackTraceLimit { }

interface AppConfig {
  config: any;
}

declare var app: AppConfig;

type Environment = 'local'
  | 'develop'
  | 'test'
  | 'prod';

type BuildTarget = 'web' | 'mobile' | 'desktop';

declare namespace NodeJS {

  interface Global {
    app: AppConfig;
  }
}
