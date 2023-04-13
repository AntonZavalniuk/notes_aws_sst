import { Table } from 'sst/node/table';
import handler from '../../core/src/handler';
import dynamoDb from '../../core/src/dynamodb';

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: '123',
      noteId: event.pathParameters.id,
    },
  };

  await dynamoDb.delete(params);

  return { status: 'Deleted successfully' };
});
