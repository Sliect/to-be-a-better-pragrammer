export interface Options<LocalData, RemoteData> {
  format?: (record: RemoteData) => LocalData;
  transform?: (record: LocalData) => RemoteData;
  services: {
    get?: (...args: any[]) => Promise<any>;
    create?: (...args: any[]) => Promise<any>;
    update?: (...args: any[]) => Promise<any>;
    del?: (...args: any[]) => Promise<any>;
  };
}

export interface useEntityApi<LocalData, RemoteData> {
  format?: (record: RemoteData) => LocalData;
  transform?: (record: LocalData) => RemoteData;
  services: {
    get: (...args: any[]) => Promise<any>;
    create: (...args: any[]) => Promise<any>;
    update: (...args: any[]) => Promise<any>;
    del: (...args: any[]) => Promise<any>;
  };
}
