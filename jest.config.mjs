/** @type {import('jest').Config} */
export default {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    },
    testMatch: [
        '**/__tests__/**/*.(spec|test).(j|t)s?(x)',
        '**/?(*.)+(spec|test).(j|t)s?(x)',
    ],
    testPathIgnorePatterns: [
        './node_modules/',
        '/node_modules/',
        '/lib/',
        '<rootDir>/lib/',
        '<rootDir>/node_modules/',
    ],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    moduleDirectories: [
        'node_modules',
        // add the directory with the test-utils.tsx file
        'utils', // a utility folder
        '<rootDir>', // the root directory
    ],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
};
