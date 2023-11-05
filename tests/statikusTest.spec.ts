// eslint-disable-next-line node/no-unpublished-import
import { expect } from "@playwright/test";
import { statikusTest } from "../Config/statikusTest";
import {startServer, stopServer} from '../Config/server'

statikusTest.describe('Example test', () => {
  statikusTest('should allow me to add todo items', async ({page}) => {
    
    const pid = await startServer()

    console.log('This is test 01');
    const ipAddress = process.env.IP_ADDRESS || '192.168.100.8';
    //await page.waitForTimeout(2_000);

    await page.goto('http://localhost:5000/user/read/2');

    await expect(page).toHaveURL('http://localhost:5000/user/read/2');

    await stopServer(pid)
  });
});
