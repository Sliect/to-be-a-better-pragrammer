import React, { useState } from 'react';
import useFetch from '../useFetch';
import { Options } from './types';

export default <LocalData, RemoteData>({
  format,
  transform,
  services,
}: Options<LocalData, RemoteData>) => {
  const [entity, setEntity] = useState<LocalData>();

  const handleGet = useFetch(
    (params: any) => {
      if (services.get) {
        return services.get(params).then((res) => {
          if (res && res.success) {
            const currentEntity = format ? format(res.data) : res.data;
            setEntity(currentEntity);
            res.data = currentEntity;
          }

          return res;
        });
      }
      return Promise.reject();
    },
    {
      manual: true,
    },
  );

  const handleCreate = useFetch(
    (params: any) => {
      if (services.create) {
        return services.create(transform ? transform(params) : params);
      }
      return Promise.reject();
    },
    {
      manual: true,
    },
  );

  const handleUpdate = useFetch(
    (params: any) => {
      if (services.update) {
        return services.update(transform ? transform(params) : params);
      }
      return Promise.reject();
    },
    {
      manual: true,
    },
  );

  const handleDelete = useFetch(
    (params: any) => {
      if (services.del) {
        return services.del(params);
      }
      return Promise.reject();
    },
    {
      manual: true,
    },
  );

  return {
    entity,
    setEntity,
    handleGet: services.get ? handleGet : undefined,
    handleCreate: services.create ? handleCreate : undefined,
    handleUpdate: services.update ? handleUpdate : undefined,
    handleDelete: services.del ? handleDelete : undefined,
  };
};
