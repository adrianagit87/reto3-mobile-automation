import type { Options } from '@wdio/types';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config();

export const sharedConfig: Partial<Options.Testrunner> = {
  runner: 'local',
  framework: 'mocha',

  specs: [],

  maxInstances: 1,

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 20_000,
  connectionRetryTimeout: 120_000,
  connectionRetryCount: 3,

  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false,
    }],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 180_000,
  },

  // Screenshot automático en fallo (clave para evidencias del reto)
  afterTest: async function (test, _context, { error }) {
    if (error) {
      const dir = path.join(process.cwd(), 'screenshots');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const safeName = test.title.replace(/[^a-z0-9]/gi, '_');
      const file = path.join(dir, `${Date.now()}_${safeName}.png`);
      await browser.saveScreenshot(file);
      // adjuntar al reporte Allure
      const { default: allure } = await import('@wdio/allure-reporter');
      allure.addAttachment('Screenshot on failure', fs.readFileSync(file), 'image/png');
    }
  },
};
