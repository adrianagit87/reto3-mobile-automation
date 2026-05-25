import type { Options } from '@wdio/types';
import { sharedConfig } from './wdio.shared.conf';

const sauceUser = process.env.SAUCE_USERNAME;
const sauceKey = process.env.SAUCE_ACCESS_KEY;

if (!sauceUser || !sauceKey) {
  throw new Error(
    'SAUCE_USERNAME y SAUCE_ACCESS_KEY no están seteados. Copiá env.example a .env y completalos.'
  );
}

export const config: Options.Testrunner = {
  ...sharedConfig,

  specs: ['../test/specs/ios/**/*.e2e.ts'],

  user: sauceUser,
  key: sauceKey,
  region: (process.env.SAUCE_REGION ?? 'us-west-1') as Options.SauceRegions,

  capabilities: [{
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '17',
    'appium:app': process.env.SAUCE_IOS_APP ?? 'storage:filename=My-Demo-App.ipa',
    'appium:newCommandTimeout': 240,
    'sauce:options': {
      build: `reto3-mobile-${new Date().toISOString()}`,
      name: 'iOS catalog navigation E2E',
      idleTimeout: 300,
    },
  }],

  services: [
    ['sauce', {
      sauceConnect: false,
    }],
  ],

  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },
} as Options.Testrunner;
