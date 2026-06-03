# React Semantic Toasts

Simple and easy Semantic UI animated toast notifications for React

![Toasts](/img/toasts.png?raw=true 'Toasts')

## Installation

```bash
$ npm install --save @coradoya/react-semantic-toasts semantic-ui-react@^2.1.3 semantic-ui-css
```

When installing from [GitHub Packages](https://github.com/coradoya/react-semantic-toasts/packages), copy [`.npmrc.example`](./.npmrc.example) to `.npmrc` and set `NODE_AUTH_TOKEN` to a [personal access token](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages) with `read:packages` (or use `GITHUB_TOKEN` in CI). Publish manually via **Actions → Publish package → Run workflow**.

Requires **React 18** or **19**, **react-dom** with the same range, and **semantic-ui-react ^2.1.3**. The published bundle is built with [React Compiler](https://react.dev/reference/react-compiler/compiling-libraries) (`target: '18'`). This package depends on `react-compiler-runtime@latest` so npm always resolves the current stable runtime and avoids version skew with the compiler output. See [CHANGELOG.md](./CHANGELOG.md) for peer dependency changes in 0.7.0.

## Usage

The library does not depend on `semantic-ui-css` anymore, make sure to import `semantic.min.css` or at the very least, to include the following components:

```javascript
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';
```

Import the library into your project using ES6 module syntax:

```javascript
import { SemanticToastContainer, toast } from '@coradoya/react-semantic-toasts';
import '@coradoya/react-semantic-toasts/styles/react-semantic-alert.css';
```

Render the `SemanticToastContainer` component once in your app tree (React 18 `createRoot` example):

```jsx
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
    <>
        <App />
        <SemanticToastContainer />
    </>
);
```

Fire as many notifications as you want

```javascript
setTimeout(() => {
    toast(
        {
            title: 'Info Toast',
            description: <p>This is a Semantic UI toast</p>
        },
        () => console.log('toast closed'),
        () => console.log('toast clicked'),
        () => console.log('toast dismissed')
    );
}, 1000);

setTimeout(() => {
    toast({
        type: 'warning',
        icon: 'envelope',
        title: 'Warning Toast',
        description: 'This is a Semantic UI toast wich waits 5 seconds before closing',
        animation: 'bounce',
        time: 5000,
        onClose: () => alert('you close this toast'),
        onClick: () => alert('you click on the toast'),
        onDismiss: () => alert('you have dismissed this toast')
    });
}, 5000);
```

## API

### Toast Container

The `<SemanticToastContainer>` receives an optional `position` prop, which can be one of `top-right`, `top-center`, `top-left`, `bottom-right`, `bottom-center` or `bottom-left`.

The type of animation can be specifed using an optional `animation` prop with any supported [SemanticUI animation](https://semantic-ui.com/modules/transition.html) value. If not present, will be derived from the container position.

```jsx
<SemanticToastContainer position="top-right" />
```

#### Max Toasts

Supply the `maxToasts` prop to `<SemanticToastContainer>` to control the amount of toasts visible at any given time.

- `maxToasts` - The amount of toasts to display at once. On new toasts, the toaster removes the oldest toast to stay within the limit. That removal is immediate (no close animation), same as in earlier versions.

```jsx
<SemanticToastContainer position="top-right" maxToasts={3}/>
```

### Toast

The `toast` notification function receives a toast options object and optional close, click and dismiss callbacks as function arguments:

```javascript
toast(options, onClose, onClick, onDismiss);
```

#### Toast Options

-   `title` - The header of the toast
-   `description` - The content of the toast
-   `type` - Can be one of `info`, `success`, `warning`, or `error`
-   `icon` - Override the default icon
-   `color` - Override color with [semantic values](https://react.semantic-ui.com/collections/message/#variations-color)
-   `size` - Size of toast with [semantic values](https://react.semantic-ui.com/collections/message/#variations-size)
-   `list` - Array of strings for showing an item menu inside the toast
-   `time` - Duration to keep the toast open, 0 to wait until closed by the user
-   `onClose` - The function that will be called when the toast is closed (either if you have clicked the close sign or if the toast has been closed after `time` has passed)
-   `onClick` - The function that will be called when you click on the toast
-   `onDismiss` - The function that will be called when you click to close the toast. onClose function will be called afterwards.
-   `animation` - Override the default toast container animation

## License

Licensed under MIT
