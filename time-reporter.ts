import type {
    FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
  } from '@playwright/test/reporter';
  import dotenv from 'dotenv'
import { Client } from 'ts-postgres';

  class TimeReporter implements Reporter {
    startTime: number;
    onBegin(config: FullConfig<{}, {}>, suite: Suite): void {
        this.startTime = Date.now()
        console.log('Starting time measurement.')
    }
    async onEnd(result: FullResult): Promise<void | { status?: 'passed' | 'failed' | 'timedout' | 'interrupted' | undefined; } | undefined> {
        const endTime = Date.now();
        const executionTime = (endTime-this.startTime)/1000; 
        console.log(`Completion time: ${executionTime}`)
        await saveToDb(executionTime)
    }
  }

  export default TimeReporter;

  async function saveToDb(executionTime: number) {
    dotenv.config()

    const databaseHost = process.env.DATABASE_HOST;
    const databasePassword = process.env.POSTGRES_PASSWORD;
    const runId = process.env.RUN_ID;
    const hostname = process.env.HOSTNAME;
    
    console.log(JSON.parse(JSON.stringify({
        'hostname': hostname,
        'run-id': runId,
        'performance': executionTime,
        'database-ip': databaseHost
      })))

    const client = new Client({
        user: 'postgres',
        password: databasePassword,
        database: 'postgres',
        host: databaseHost,
      });
      await client.connect();

      try {
        const response = client.query(`INSERT INTO static_table VALUES (
            ${runId}, ${executionTime}, ${hostname}
        );`)
        for await (const row of response) {
            console.info(row);
          }
      } catch (error) {
        console.error(error);
      }
  }

  