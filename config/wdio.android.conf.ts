import type { Options } from '@wdio/types';
import * as path from 'path';
import { sharedConfig } from './wdio.shared.conf';

export const config: Options.Testrunner = {
  ...sharedConfig,

  specs: ['../test/specs/android/**/*.e2e.ts'],

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME ?? 'Pixel_6_API_34',
    'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION ?? '14',
    'appium:app': path.resolve(process.env.ANDROID_APP_PATH ?? './apps/mda-2.2.0-25.apk'),
    'appium:appPackage': 'com.saucelabs.mydemoapp.android',
    'appium:appActivity': 'com.saucelabs.mydemoapp.android.view.activities.SplashActivity',
    'appium:autoGrantPermissions': true,
    'appium:noReset': false,
    'appium:newCommandTimeout': 240,
  }],

  services: [
    ['appium', {
      args: {
        relaxedSecurity: true,
      },
      logPath: './logs',
    }],
  ],

  // Hook de carga de tipos para ts-node
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },
} as Options.Testrunner;
