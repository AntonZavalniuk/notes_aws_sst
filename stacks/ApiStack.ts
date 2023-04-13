import { Api, use } from 'sst/constructs';
import { StorageStack } from './StorageStack';

interface ApiStackProps {
  stack: any;
  app: any;
}

export function ApiStack({ stack, app }: ApiStackProps) {
  const { table } = use(StorageStack);

  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        bind: [table],
      },
    },
    cors: true,
    routes: {
      'GET /notes': 'packages/functions/src/list.main',
      'POST /notes': 'packages/functions/src/create.main',
      'GET /notes/{id}': 'packages/functions/src/get.main',
      'PUT /notes/{id}': 'packages/functions/src/update.main',
      'DELETE /notes/{id}': 'packages/functions/src/delete.main',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
