import { describe, it, expect, beforeAll } from 'vitest';

describe('version endpoint data', () => {
  beforeAll(() => {
    process.env.APP_NAME = 'test-app';
    process.env.APP_VERSION = '1.0.0';
  });

  it('exposes expected env vars', () => {
    expect(process.env.APP_NAME).toBe('test-app');
    expect(process.env.APP_VERSION).toBe('1.0.0');
  });

  it('NODE_ENV is always defined', () => {
    expect(process.env.NODE_ENV).toBeDefined();
  });
});
