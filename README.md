# spa-react-app-config

Данный пакет основан на докладе Ивана Малюгина ["А почему бы не вынести все конфиги в отдельный пакет, сократив бойлерплейт до нуля?"](https://www.youtube.com/watch?v=OejfAvTj93I&t=941s&ab_channel=HolyJS)

Существует альтернативный проект [heft](https://heft.rushstack.io/)

В приложении нужно в файлах конфигурации, созданных в приложении, экспортировать импортированные из node_modules конфиги

## babelrc.js

```js
module.exports = require('@budarin/spa-react-app-config').babelConfig(__dirname);
```

## prettierrc.js

```js
module.exports = require('@budarin/spa-react-app-config').prettierrc;
```

## .eslintrc.js

```js
module.exports = require('@budarin/spa-react-app-config').eslintrc;
```

## stylelint.config.js

```js
module.exports = require('@budarin/spa-react-app-config').stylelintConfig;
```

## jest.config.js

```js
module.exports = require('@budarin/spa-react-app-config').jestConfig;
```

## playwright.config.ts

```js
module.exports = require('@budarin/spa-react-app-config').playwrightConfig;
```

## tsconfig

```json
{
    "extends": "node_modules/@budarin/spa-react-app-config/tsconfig.json"
}
```

## webpack

в общем случае просто экспортируем импортированный из node_modules конфиг

```js
module.exports = require('@budarin/spa-react-app-config').webpackConfigs.dev;
```

но если конфиг нужно кастомизировать, то делаем это так

```js
const defaultConfig = require('@budarin/spa-react-app-config').webpackConfigs.dev;

module.exports = {
    ...defaultConfig,
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            {
                //new rules
            },
        ],
    },
};
```
