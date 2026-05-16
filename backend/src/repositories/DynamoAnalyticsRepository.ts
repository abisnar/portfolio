import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import type { AnalyticsRepository } from './AnalyticsRepository';
import type { StatEntry } from '../models/events';

export class DynamoAnalyticsRepository implements AnalyticsRepository {
  private readonly doc: DynamoDBDocumentClient;

  constructor(
    private readonly tableName: string,
    region: string,
    client?: DynamoDBDocumentClient,
  ) {
    this.doc = client ?? DynamoDBDocumentClient.from(new DynamoDBClient({ region }));
  }

  async increment(event: string, at: string): Promise<void> {
    await this.doc.send(new UpdateCommand({
      TableName: this.tableName,
      Key: { event },
      UpdateExpression: 'ADD #c :one SET last_at = :now',
      ExpressionAttributeNames: { '#c': 'count' },
      ExpressionAttributeValues: { ':one': 1, ':now': at },
    }));
  }

  async list(): Promise<StatEntry[]> {
    const out = await this.doc.send(new ScanCommand({ TableName: this.tableName }));
    return (out.Items ?? []).map((it) => ({
      event: String(it.event),
      count: Number(it.count ?? 0),
      lastAt: it.last_at ? String(it.last_at) : null,
    }));
  }
}
