# Aliases

Для того чтобы в коде использовать алиасы папок необходимо:

-   описать базовый путь и алиасы в tsconfig.js

    ```js
        "compilerOptions": {
          "baseUrl": "./src",
          "paths": {
              "core/*": ["core/*"],
              "domain/*": ["core/domain/*"],
              "application/*": ["core/application/*"],
              "services/*": ["services/*"],
              "store/*": ["services/store/*"],
              "ui/*": ["ui/*"],
              "utils/*": ["utils/*"]
          }
      },
    ```

    -   настроить ESLint для понимания этих алиасов путем добавления в конфиг ссылки на tsconfig.json

    ```js
      parserOptions: {
          ...
          project: 'tsconfig.json',
      },
    ```

    -   для того чтобы Jest понимал алиасы - нужно лишь добавить папаку src moduleDirectories

    ```js
      {
        moduleDirectories: [
          "node_modules",
          "src",
        ],
        moduleNameMapper: {
          '^core(.*)': '<rootDir>/src/core/$1',
          '^domain(.*)': '<rootDir>/src/core/domain/$1',
          '^application(.*)': '<rootDir>/src/core/application/$1',
          '^services(.*)': '<rootDir>/src/services/$1',
          '^store(.*)': '<rootDir>/src/services/store/$1',
          '^ui(.*)': '<rootDir>/src/ui/$1',
          '^utils(.*)': '<rootDir>/src/utils/$1',
      }
      }
    ```

    -   В Webpack config нужно добавить плагин

    ```js
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

    module.exports = {
        // ...
        resolve: {
            // ...
            plugins: [new TsconfigPathsPlugin()],
        },
    };
    ```

После этого в коде можно использовать алиасы

```ts
import { createCategory } from 'domain/category/createCategory.ts';
...
import { useAppStore } from 'store/index.tsx';
```
