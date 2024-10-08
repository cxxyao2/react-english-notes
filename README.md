# English Notes

## run

```
npm start
```

## Objective

- Create a high performance React App
- Comply with WCAG2.1. Level AA
- Imporve english vocabulary

## Framework and 3rd libraries

- React
- Redux.Redux Toolkit. Typed dispatch and typed selector
- Redux: Ayncthunk function.Extra reducers. Save timestamp of Date object for serialization.
- Typescript
- Bootstrap 5, responsive UI
- Markdown Editor : @uiw/react-md-editor . Edit / Update
- React-router-dom v6
- Protected routes: redirect to login form if not logged in
- Markdown Display: Markdown to JSX
- Yup, React-hook-form
- Database: Firestore database (attention: ≠ Realtime database)
- Authentication: email-password
- Dynamically rendering an array of Components
- Composition takes precedence over mutation,e.g. use forwardRef to add custom style to react router link
- tsconfig.json: absolute imports
- Modify webpack.config.js without eject using @craco/craco
- analyzer and compress bundled files after building

## performance

- lodash.debounce input onchange event

## Vscode extensions

- intellisense for css class names in HTML
- html css support
- emmet
- auto import
- auto rename tag
- react/redux/react-native snippets

## Configurations

- create .env.local under root folder(package.json exists)

```
REACT_APP_API_KEY=your-api-key
REACT_APP_AUTH_DOMAIN=your-app-auth-domain
...
```

- set environment variables under window powershell

```
$env:variable='varialbe-value'
```

## Commands

- npm run start
- npm run build
- npx serve -s build
- windows11 chrome: ctrl + shift + n : open a new incognito tab

## Deployment

[Note Demo based on React and Redux] (https://react-english-notes.vercel.app/)

## Screenshots

- To use the Snipping Tool :Press Windows logo key + Shift + S.

![Lighthouse Score](./public/performance1.jpg)
![small-screen](./public/small-screen.jpg)

## References:

- create and edit blog

https://www.youtube.com/watch?v=0pPlbLyeclI

current Markdown
https://npm.io/package/@uiw/react-md-editor
