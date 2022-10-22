import Config from './config'
import Utils from './utils'

// @ts-ignore
import lessToJs from 'less-vars-to-js'

export default class ThemeGenerator {
  themes: Library.Themes = {}

  constructor() {
    this._installThemes()
  }  

  _installThemes() {
    const config = this._config
    const themeFiles = Utils.readDir(config.themesPath)

    themeFiles.forEach((file: string) =>{
      if (!file.match('.less')) {
        return;
      }

      const fileMetadata = Utils.fileMetadata(file);
      const name = fileMetadata.name
      const themeFile = Utils.readFile([config.themesPath, fileMetadata.base].join('/'))

      this.themes[name] = this._getThemeVars(themeFile)
    });
  }

  get _config(): Library.Config {
    const configFile = Utils.readFile(Config.configPath)
    const configOptions = Utils.fileToJson<Library.Config>(configFile);
    const config = new Config(configOptions)

    return config;
  }

  _getThemeVars(themeData: string) {
    return lessToJs(themeData, { resolveVariables: true, stripPrefix: true })
  }

  get vars(): Library.Vars {
    return this._keys.reduce((vars, key) => Object.assign(vars, {
      [key]: `var(--${key})`
    })
    , {})
  }

  get _keys() {
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
  
  _themeVarsToCssVars(themeName: string, theme: Library.Theme) {
    return `.${themeName}{${Object.keys(theme).reduce((vars, key) => vars.concat(`--${key}: ${theme[key]};`), '')}}`
  }
}

export { ThemeGenerator }


