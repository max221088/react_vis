# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Интерфейс :

1. Справа отображаються волты и кнопка "показать все волты" при клике на волт он отображается в основном окне.
2. Сверху слева чекбокс по отображению якорей файла - Верхний левый угол - окно буфера обмена
3. Снизу слева кнопки редактирования. - файлы отображаються как светлые пронумерованые крупные узлы. - якоря серые мелкие точки и могут не отображаться в зависимости от состояния чекбокса
4. теги это небольшие синие узлы

Реализованные функции:

1.  Копирование файла с помощью буфера обмена.
    - дважды кликнуть по файлу после этого скопированый файл вместе с якорями появится в окне буфера обмена
    - переключится на отображение другого волта и кликнуть один раз по файлу к которому будет вставлен и прикреплен файл с буфера обмена.
2.  Отделение файла от общего волта.
    - зажать клавишу ctrl кликнуть по файлу и начать его двигать в сторону до отрыва от основной сети.
    - отпустить отделенный пучек.
3.  Добавление новой связи. Связи образуються между файтами и другими файлами и между файлами и другими тегами.
    - кликнуть на файл от которого нужно образовать связь
    - зажать клавишу ctrl и кликнуть на другой файл или тег к которому нужно образовать связь.

Документация VIS.js https://visjs.org/
Документация npm vis.js https://www.npmjs.com/package/vis-network
