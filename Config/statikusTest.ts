import {test as base} from '@playwright/test'
import execa from 'execa'

type resetAUT = {
    resetAUT: void,
}

export const statikusTest = base.extend({
    resetAUT: async ({}, use) => {
        console.log('Reset started...')
        await execa('rm', ['-R', './BUILD'])
        await execa('dotnet', ['publish', '-o', './BUILD', './EK7TKN_HFT_2021221.sln'])        
        console.log('New server installed!')
    }
})
