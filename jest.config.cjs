module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/test'],
    testMatch: ['**/*.test.jsx'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleDirectories: ['node_modules', 'lib'],
    setupFilesAfterEnv: ['<rootDir>/test/setup.js']
};
