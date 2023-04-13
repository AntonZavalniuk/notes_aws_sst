import { Table } from 'sst/node/table';
import handler from '../../core/src/handler';
import dynamoDb from '../../core/src/dynamodb';

export const main = handler(async () => {
  const params = {
    TableName: Table.Notes.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId' partition key
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': '123',
    },
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});
