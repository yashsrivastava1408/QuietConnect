declare module "node:sqlite" {
  class StatementSync {
    run(...params: unknown[]): { lastInsertRowid?: number | bigint };
    get(...params: unknown[]): any;
    all(...params: unknown[]): any[];
  }

  class DatabaseSync {
    constructor(path: string);
    exec(source: string): void;
    prepare(source: string): StatementSync;
    close(): void;
    pragma(source: string): void;
  }

  export { DatabaseSync, StatementSync };
}
