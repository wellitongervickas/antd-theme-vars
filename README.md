# Antd Theme Vars

Since Ant Design does not have a way to handle theme switch.
This package will scan your theme folder and generate css and theme vars to override your less variables.

## How it works:

### Theme files
dark.less
```less
@primary-color: #000000;
```

light.less
```less
@primary-color: #AAAAAA;
```

Output theme.css:
```css
.light {
  --primary-color: #AAAAAA;
}

.dark {
  --primary-color: #000000;
}
```

Output theme.vars:
```js
{
  ['primary-color']: 'var(--primary-color);'
}
```

## How to use
### Create your theme files .less with only variables
- src/themes/dark.less
- src/themes/light.less


**example**: src/themes/dark.less
```less
@primary-color: red; // primary color for all components
@gray-1: #ffffff;
@gray-2: #fafafa;
@gray-3: #f5f5f5;
@gray-4: #f0f0f0;
@gray-5: #d9d9d9;
@gray-6: #bfbfbf;
@gray-7: #8c8c8c;
@gray-8: #595959;
@gray-9: #434343;
@gray-10: #262626;
```

## Create your theme.config.json on root folder
```
{
  "themesPath": "src/themes"
}
```

## Update your next.config.js
```js
const withLess = require('next-with-less')
const { theme } = require('antd-theme-vars')

// ...

const nextConfig = {
  // ...
  publicRuntimeConfig: {
    theme: theme.vars
  },
  // ....
}

// ...

module.exports = withLess({
  ...nextConfig,
  lessLoaderOptions: {
    additionalData: theme.css,
    lessOptions: {
      modifyVars: theme.vars,
      javascriptEnabled: true,
    }
  }
})

...
```

## Create your theme switcher with Styled Components
**example**: src/themes/Theme.tsx
```jsx
import getConfig from 'next/config';
import { ReactNode, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export type Theme = {
  vars: {
    [key: string]: string
  }
}

export interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { publicRuntimeConfig } = getConfig()
  const [dark, setIsDark] = useState(false)

  return (
    <StyledThemeProvider theme={publicRuntimeConfig.theme ?? {}}>
      <div className={dark ? 'dark': 'light'}>
        <button onClick={() => setIsDark(!dark)}>Toggle theme</button>
        {children}
      </div>
    </StyledThemeProvider>
  )
}
```