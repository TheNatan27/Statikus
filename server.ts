import execa from "execa";

export async function startServer() {
    const dotnetServer = execa('dotnet', ['/BUILD/EK7TKN_HFT_2021221.Endpoint.dll', '--urls=http://0.0.0.0:5000'], {detached: true});    
    return dotnetServer.pid!
}

export async function stopServer(pid: number) {
    process.kill(pid)
}