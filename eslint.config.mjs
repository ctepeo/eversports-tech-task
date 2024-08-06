// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	eslintConfigPrettier,
	{
		ignores: ['node_modules', 'dist', 'coverage', 'test-reports'],
	},
	{
		rules: {
			'max-len': ['error', { code: 200 }],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'after-used',
					caughtErrors: 'all',
					ignoreRestSiblings: false,
					reportUsedIgnorePattern: false,
					varsIgnorePattern: '^_', // Ignore unused variables starting with an underscore
					argsIgnorePattern: '^_', // Ignore unused function arguments starting with an underscore
				},
			],
      '@typescript-eslint/no-extraneous-class': 'off',
		},
	},
);
