# Aliases

Для того чтобы в коде использовать алиасы папок необходимо:

-   описать базовый путь и алиасы в tsconfig.js
    ```js
        "compilerOptions": {
          "baseUrl": "./src",
          "paths": {
              "domain/*": ["domain/*"],
              "store/*": ["store/*"]
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
    moduleDirectories: [
      "node_modules",
      "src"
    ],
    ```

После этого в коде можно использовать алиасы

```ts
import { createCategory } from 'domain/category/createCategory.ts';
...
import { useAppStore } from 'store/index.tsx';
```

Webpack не нуждается в изменениях и отлично подхватывает и разрешает алиасы
