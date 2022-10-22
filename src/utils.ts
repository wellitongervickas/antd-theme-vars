import fs from 'fs-extra'
import path from 'path'

export default class Utils {
  // prevent create constructor instance
  constructor() {}  

  static fileMetadata(file: string) {
    return path.parse(file)
  }

  static fileToJson<T>(file: string) {
    return JSON.parse(file) as T
  }

  static readFile(file: string) {
    const data = fs.readFileSync(file, 'utf8')
  
    if (!data) {
      throw Error(`File not found: ${file}`)
    }

    return data;
  }

  static readDir(folder: string) {
    const data = fs.readdirSync(folder)

    if (!data) {
      throw Error(`Folder not found: ${folder}`)
    }

    return data
  }
}

export { Utils }

