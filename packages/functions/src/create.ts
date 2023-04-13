import { Table } from 'sst/node/table';
import * as uuid from 'uuid';
import handler from '../../core/src/handler';
import dynamoDb from '../../core/src/dynamodb';

export const main = handler(async (event: { body: string }) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      userId: '123',
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
