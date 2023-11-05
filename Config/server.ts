import execa from "execa";
import path from "path";

export async function installServer(installPath: string) {
    console.log('Reset started...')
    await execa('rm', ['-R', installPath])
    await execa('dotnet', ['publish', '-o', installPath, './EK7TKN_HFT_2021221.sln'])        
    console.log('New server installed!')
}

export async function startServer(dllPath: string) {
    const dotnetServer = execa('dotnet', [dllPath, '--urls=http://0.0.0.0:5000'], {detached: true});    
    dotnetServer.stdout?.pipe(process.stdout)
    return dotnetServer.pid!
}

export async function stopServer(pid: number) {
    process.kill(pid)
}