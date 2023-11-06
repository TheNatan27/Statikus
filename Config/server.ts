import execa from "execa";

export async function cleanRemaningFolder(installedPath:string) {
    console.log('Reset started...')
    try {
        await execa('rm', ['-R', installPath])
        console.log('Old server removed.')
    } catch (error) {
        console.error('No such directory!')
    }
}

export async function downloadSource() {
    console.log('Downloadin source...')
    try {
        await execa('git', ['clone', 'https://github.com/TheNatan27/EK7TKN_HFT_2021221.git', '-b', 'UpdateDotnet'])
        console.log('Source downloaded.')
    } catch (error) {
        console.error(error)
    }
}

export async function installServer(buildPath: string, installPath: string) {
    try {
        await execa('dotnet', ['build', '-o', installPath, buildPath])        
        console.log('New server installed!')
    } catch (error) {   
        console.error(error)
    }

}

export async function startServer(dllPath: string) {
    const dotnetServer = await execa('dotnet', [dllPath, '--urls=http://0.0.0.0:5000'], {detached: true});    
    dotnetServer.stdout?.pipe(process.stdout)
    return dotnetServer.pid!
}

export async function stopServer(pid: number) {
    process.kill(pid)
}

export async function cleanSource(buildPath: string) {
    try {
        console.log('Cleaning build...')
        await execa('dotnet', ['clean', buildPath])
    } catch (error) {
        console.error(error)
    }
}

export async function removeSource(buildPath: string) {
    try {
        console.log('Removing build...')
        await execa('rm', ['-r', '-f', buildPath])
    } catch (error) {
        console.error(error)
    }
}