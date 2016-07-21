interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

interface AppConfig {
  config: any;
}

interface WebpackRequire {
    (id: string): any;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure(ids: string[], callback: (req: WebpackRequire) => void, chunkName?: string): void;
    context(directory: string, useSubDirectories?: boolean, regExp?: RegExp): WebpackContext;
}

interface WebpackContext extends WebpackRequire {
    keys(): string[];
}

type Environment = 'local'
  | 'develop'
  | 'test'
  | 'prod';

type BuildTarget = 'web' | 'mobile' | 'desktop';

declare var app: AppConfig;

declare namespace NodeJS {
  interface Global {
    app: AppConfig;
  }
}

interface NodeRequire extends WebpackRequire { }
interface ErrorConstructor extends ErrorStackTraceLimit { }
