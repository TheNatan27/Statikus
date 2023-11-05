import execa from "execa";


export async function installServer(buildPath: string, installPath: string) {
    console.log('Reset started...')
    try {
        await execa('rm', ['-R', installPath])
        console.log('Old server removed.')
    } catch (error) {
        console.error(error)
    }
    try {
        await execa('dotnet', ['publish', '-o', buildPath, './EK7TKN_HFT_2021221.sln'])        
        console.log('New server installed!')
    } catch (error) {   
        console.error(error)
    }

}

export async function startServer(dllPath: string) {
    const dotnetServer = execa('dotnet', [dllPath, '--urls=http://0.0.0.0:5000'], {detached: true});    
    dotnetServer.stdout?.pipe(process.stdout)
    return dotnetServer.pid!
}

export async function stopServer(pid: number) {
    process.kill(pid)
}