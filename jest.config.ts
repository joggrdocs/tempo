import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  testPathIgnorePatterns: ['dist', '/node_modules/'],
  coveragePathIgnorePatterns: ['src/index.ts', 'src/lib/markdown/index.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  automock: false,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json'
      }
    ]
  }
};

export default config;
