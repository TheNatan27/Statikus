import {test as base} from '@playwright/test'
import execa from 'execa'

type resetAUT = {
    resetAUT: void,
}

export const statikusTest = base.extend<{resetAUT: resetAUT}>({
    resetAUT: [
        async (use) => {
            await execa('rm', ['-R', './BUILD'])
            await execa('dotnet', ['publish', '-o', './BUILD', './EK7TKN_HFT_2021221.sln'])        
        },
        {
            auto: true,
            timeout: 180_000
        }
    ]
})
