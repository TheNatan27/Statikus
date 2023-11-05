// eslint-disable-next-line node/no-unpublished-import
import { expect, test } from "@playwright/test";
import {installServer, startServer, stopServer} from '../Config/server'
import path from "path";

test.describe('Example test', () => {
  test('should allow me to add todo items', async ({page}) => {
    const buildPath = path.join(__dirname, 'EK7TKN_HFT_2021221')
    const installedPath = path.join(__dirname, 'INSTALLED')
    const dllPath = path.join(installedPath, 'EK7TKN_HFT_2021221.Endpoint.dll')
    console.log(buildPath)
    console.log(installedPath)
    console.log(dllPath)
    
    await installServer(buildPath, installedPath)
    
    const pid = await startServer(dllPath)

    console.log('This is test 01');
    const ipAddress = process.env.IP_ADDRESS || '192.168.100.8';
    //await page.waitForTimeout(2_000);

    await page.waitForTimeout(10_000)
    await page.goto('http://localhost:5000/user/read/2', {timeout: 20_000});

    await expect(page).toHaveURL('http://localhost:5000/user/read/2');

    await stopServer(pid)
  });
});
