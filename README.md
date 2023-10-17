# @budarin/spa-react-app-config

Данный пакет основан на докладе Ивана Малюгина ["А почему бы не вынести все конфиги в отдельный пакет, сократив бойлерплейт до нуля?"](https://www.youtube.com/watch?v=OejfAvTj93I&t=941s&ab_channel=HolyJS)

Существует альтернативный проект [heft](https://heft.rushstack.io/)

Преимущества использования внешнего пакета с базовыми настройками конфигураций приложения:

-   все необходимые пакеты устанавливаются при помощи установки всего одного пакета
-   все приложения будут использовать единые настройки
-   ...

Неостатки:

-   в CI всегда будут устанавливаться все пакеты для разработки т.к. при публикации пакета устанавливаются только зависимости из секции dependencies, а в данном пакете мы вынуждены все пакеты размещать только в секции dependencies, чтобы они были установлены у клиента

## Установка

`yarn add @budarin/spa-react-app-config`

## Настройка проекта

В приложении нужно в файлах конфигурации, созданных в приложении, экспортировать импортированные из node_modules конфиги

### babel.config.js

```js
module.exports = require('@budarin/spa-react-app-config').getBabelConfig(__dirname);
```

### prettier.config.js

```js
module.exports = require('@budarin/spa-react-app-config').prettierConfig;
```

### eslintrc.js

```js
module.exports = require('@budarin/spa-react-app-config').eslintrc;
```

Используем `eslintrc.js` так как еще не все плагины готовы к новой конфигурации

### stylelint.config.js

```js
module.exports = require('@budarin/spa-react-app-config').stylelintConfig;
```

### jest.config.js

```js
module.exports = require('@budarin/spa-react-app-config').jestConfig;
```

### playwright.config.ts

```js
module.exports = require('@budarin/spa-react-app-config').playwrightConfig;
```

### tsconfig

```json
{
    "extends": "node_modules/@budarin/spa-react-app-config/tsconfig.json"
}
```

### webpack

в общем случае просто экспортируем импортированный из node_modules конфиг

```js
module.exports = require('@budarin/spa-react-app-config').webpackConfigs.getDevConfig();
```

но если конфиг нужно кастомизировать, то делаем это так

```js
const defaultConfig = require('@budarin/spa-react-app-config').webpackConfigs.getDevConfig();

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

## CLI

`spa-react-app-config`

### Options

-   install
