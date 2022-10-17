import path from 'path'
import fs from 'fs-extra'

// @ts-ignore
import lessToJs from 'less-vars-to-js'

type _GeneralObject<T>  = {
  [key: string]: T
}

type Setup = {
  themesPath: string
}

export default class ThemeGenerator {
  themes: _GeneralObject<_GeneralObject<string>> = {}

  constructor() {
    this._installThemes()
  }  

  _installThemes() {
    const setup = this._getSetupFile()
    const { themesFiles, themesPath } = this._getThemesFolder(setup)

    themesFiles.forEach((file: string) =>{
      if (!file.match('.less')) {
        return;
      }

      const name = path.parse(file).name;
      const themePath  = path.join(`${themesPath}/${file}`);
      const themeData = fs.readFileSync(themePath, 'utf8')

      this.themes[name] = this._getThemeVars(themeData)
    });
  }

  _getSetupFile(): Setup {
    const setupFile = path.join(__dirname, '../../../theme.config.json');
    if (!setupFile) {
      throw Error('setup file not found')
    }

    const setupData = fs.readFileSync(setupFile, 'utf8')
    const setup = JSON.parse(setupData);

    return setup;
  }

  _getThemesFolder(setup: Setup) {
    const themesPath = path.join(__dirname, `../../../${setup.themesPath}`);
    const themesFiles = fs.readdirSync(themesPath)

    if (!themesFiles) {
      throw Error('themes not found')
    }

    return { themesFiles, themesPath }
  }

  _getThemeVars(themeData: string) {
    return lessToJs(themeData, { resolveVariables: true, stripPrefix: true })
  }
  
  get vars(): _GeneralObject<string> {
    return this.keys.reduce((vars, key) => Object.assign(vars, {
      [key]: `var(--${key})`
    })
    , {})
  }

  get keys(): string[] {
    return Object.keys(Object.keys(this.themes).reduce((setKeys, key) => {
      return {
        ...setKeys,
        ...this.themes[key]
      }
    }, {}))
  }
  
  get css() {
    return Object.keys(this.themes).reduce((data, key) => {
      return [data, this._themeVarsToCssVars(key, this.themes[key])].join('');
    }, '')
  }
  
  _themeVarsToCssVars(themeName: string, theme: _GeneralObject<string>) {
    return `
    .${themeName} {
      ${Object.keys(theme).reduce((vars, key) => vars.concat(`--${key}: ${theme[key]};`), '')}
    }
    `
  }
}

export { ThemeGenerator }

