interface IRunner {
  withFailureHandler(callback: (error: Error) => void): this;
  withSuccessHandler<T>(callback: (arg: T, userObject?: any) => void): this;
  withUserObject(userObject: any): this;

  [key: string]: (...args: any) => void;
}

interface ILocation {
  hash: string;
  parameter: {[key: string]: string};
  parameters: {[key: string]: string[]};
}

interface IHistory {
  /**
   * Pushes the provided state object, URL parameters and URL fragment onto the browser history stack.
   */
  push(stateObject: any, params?: {[key: string]: string}, hash?: string): void;
  /**
   * Replaces the top event on the browser history stack with the provided state object, URL parameters and URL fragment.
   */
  replace(stateObject: any, params?: {[key: string]: string}, hash?: string): void;
  /**
   * Sets a callback function to respond to changes in the browser history
   */
  setChangeHandler(listener: (e: {state: any, location: ILocation}) => void): void;
}

interface IHost {
  readonly origin: string;
  close(): void;
  setWidth(width: number): void;
  setHeight(height: number): void;
  readonly editor: {
    focus(): void;
  };
}

declare const google: {
  script: {
    run: IRunner,
    history: IHistory,
    host: IHost,
    url: {
      getLocation(callback: (location: ILocation) => void): void;
    }
  }
};

export function callServer<T = void>(name: string, ...args: any[]) {
  return new Promise<T>((resolve, reject) => {
    google.script.run.withFailureHandler(reject).withSuccessHandler(resolve)[name](...args);
  });
}

export function closeWindow() {
  google.script.host.close();
}

