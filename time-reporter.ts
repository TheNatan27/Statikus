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
    onEnd(result: FullResult): void | Promise<void | { status?: 'passed' | 'failed' | 'timedout' | 'interrupted' | undefined; } | undefined> {
        const endTime = Date.now();
        const executionTime = (endTime-this.startTime)/1000; 
        console.log(`Completion time: ${executionTime}`)
        saveToDb(executionTime)
    }
  }

  export default TimeReporter;

  function saveToDb(executionTime: number) {
    const databaseHost = process.env.DATABASE_HOST;
    const databasePassword = process.env.POSTGRES_PASSWORD;
    const runId = process.env.RUN_ID;
    const hostname = process.env.HOSTNAME;
    const client = new Client({
        user: 'postgres',
        password: databasePassword,
        database: 'postgres',
        host: databaseHost,
      });
      client.connect();
      console.log({
        'hostname': hostname,
        'run-id': runId,
        'performance': executionTime
      })
      try {
        const response = client.query(`INSER INTO static_table VALUES (
            ${runId}, ${executionTime}, ${hostname}
        );`)
        console.log(response)
      } catch (error) {
        console.error(error);
      }
  }

  