interface LocalForageDbInstanceOptions {
  name?: string;

  storeName?: string;
}

interface LocalForageOptions extends LocalForageDbInstanceOptions {
  driver?: string | string[];

  size?: number;

  version?: number;

  description?: string;
}

interface LocalForageDbMethodsCore {
  getItem<T>(
    key: string,
    callback?: (err: any, value: T | null) => void
  ): Promise<T | null>;

  setItem<T>(
    key: string,
    value: T,
    callback?: (err: any, value: T) => void
  ): Promise<T>;

  removeItem(key: string, callback?: (err: any) => void): Promise<void>;

  clear(callback?: (err: any) => void): Promise<void>;

  length(callback?: (err: any, numberOfKeys: number) => void): Promise<number>;

  key(
    keyIndex: number,
    callback?: (err: any, key: string) => void
  ): Promise<string>;

  keys(callback?: (err: any, keys: string[]) => void): Promise<string[]>;

  iterate<T, U>(
    iteratee: (value: T, key: string, iterationNumber: number) => U,
    callback?: (err: any, result: U) => void
  ): Promise<U>;
}

interface LocalForageDropInstanceFn {
  (
    dbInstanceOptions?: LocalForageDbInstanceOptions,
    callback?: (err: any) => void
  ): Promise<void>;
}

interface LocalForageDriverMethodsOptional {
  dropInstance?: LocalForageDropInstanceFn;
}

interface LocalForageDbMethodsOptional {
  dropInstance: LocalForageDropInstanceFn;
}

interface LocalForageDriverDbMethods
  extends LocalForageDbMethodsCore,
    LocalForageDriverMethodsOptional {}

interface LocalForageDriverSupportFunc {
  (): Promise<boolean>;
}

interface LocalForageDriver extends LocalForageDriverDbMethods {
  _driver: string;

  _initStorage(options: LocalForageOptions): void;

  _support?: boolean | LocalForageDriverSupportFunc;
}

interface LocalForageSerializer {
  serialize<T>(
    value: T | ArrayBuffer | Blob,
    callback: (value: string, error: any) => void
  ): void;

  deserialize<T>(value: string): T | ArrayBuffer | Blob;

  stringToBuffer(serializedString: string): ArrayBuffer;

  bufferToString(buffer: ArrayBuffer): string;
}

interface LocalForageDbMethods
  extends LocalForageDbMethodsCore,
    LocalForageDbMethodsOptional {}

export interface LocalForage extends LocalForageDbMethods {
  LOCALSTORAGE: string;
  WEBSQL: string;
  INDEXEDDB: string;

  config(options: LocalForageOptions): boolean;
  config(options: string): any;
  config(): LocalForageOptions;

  createInstance(options: LocalForageOptions): LocalForage;

  driver(): string;

  setDriver(
    driver: string | string[],
    callback?: () => void,
    errorCallback?: (error: any) => void
  ): Promise<void>;

  defineDriver(
    driver: LocalForageDriver,
    callback?: () => void,
    errorCallback?: (error: any) => void
  ): Promise<void>;

  getDriver(driver: string): Promise<LocalForageDriver>;

  getSerializer(
    callback?: (serializer: LocalForageSerializer) => void
  ): Promise<LocalForageSerializer>;

  supports(driverName: string): boolean;

  ready(callback?: (error: any) => void): Promise<void>;
}

export interface ProxyStorage {
  setItem<T>(k: string, v: T, m: number): Promise<T>;
  getItem<T>(k: string): Promise<T>;
  removeItem(k: string): Promise<void>;
  clear(): Promise<void>;
}

export interface ExpiresData<T> {
  data: T;
  expires: number;
}
