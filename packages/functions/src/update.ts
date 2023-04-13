import { Table } from 'sst/node/table';
import handler from '../../core/src/handler';
import dynamoDb from '../../core/src/dynamodb';

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: '123',
      noteId: event.pathParameters.id,
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  const result = await dynamoDb.update(params);

  return result.Attributes;
});
