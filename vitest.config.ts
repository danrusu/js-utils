import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // reporters: ['default', 'html', 'json', 'junit'],
    // outputFile: {
    //   junit: './reports/test-report.xml',
    //   json: './reports/test-report.json',
    //   html: './reports/test-report.html',
    // },
    maxConcurrency: 4,
  },
});
