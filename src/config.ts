import path from 'path'

import { CONFIG_THEMES_FOLDER, CONFIG_FILE_NAME } from './constants'

export default class Config {
  _config: Library.Config

  constructor(config: Library.Config) {
    this._config = config
  }

  get themesPath() {
    const defaultThemesPath =  this._config.themesPath || CONFIG_THEMES_FOLDER

    return path.join(__dirname, process.env.NODE_ENV === 'production' ? `../../../${defaultThemesPath}` : `../${defaultThemesPath}`)
  }
  
  static get configPath() {
    return path.join(__dirname, process.env.NODE_ENV === 'production' ? `../../../${CONFIG_FILE_NAME}` : `../${CONFIG_FILE_NAME}`)
  }
}

export { Config }

