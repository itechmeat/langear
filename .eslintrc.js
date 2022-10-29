module.exports = {
  extends: [
    'react-app',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['prettier', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    'coverage',
    'dist',
  ],
}

