
import * as crypto from 'crypto'
import * as fs from 'fs'
import * as path from 'path'

export default class CommonUtils {
  /**
   * 对字符串中的正则元字符进行转义
   * @param source 原字符串
   * @returns 转义后的字符串
   */
  public static escapeRegexStr(source: string): string {
    return source.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  /**
   * 计算数据的哈希值
   * @param data 需要处理的数据
   * @param hashType 哈希类型 例如md5 sha1
   */
  public static dataHash(data: Buffer|string, hashType: string): string {
    const fsHash = crypto.createHash(hashType)
    fsHash.update(data)
    return fsHash.digest('hex')
  }
  /**
   * 递归删除目录以及子目录中的所有文件
   * @param {string} targetPath 要递归删除的目录
   * @param {boolean} retainRoot 是否保留根目录不删除(默认为true)
   */
  public static deleteFolderRecursive(targetPath: string, retainRoot: boolean= true): void {
    try {
      // 判断要删除的目录是否存在
      fs.accessSync(targetPath, fs.constants.F_OK);
    } catch (err) {
      return
    }
    fs.readdirSync(targetPath).forEach(file => {
      const nextPath = path.resolve(targetPath, file)
      if (fs.statSync(nextPath).isDirectory()) { // recurse
        CommonUtils.deleteFolderRecursive(nextPath, false)
      } else {
        fs.unlinkSync(nextPath)
      }
    })
    if (!retainRoot) { // 根目录保留
      fs.rmdirSync(targetPath)
    }
  }
  /**
   * 递归拷贝目录
   * @param {string} source 源位置
   * @param {string} target 目标位置
   */
  public static copyFolderRecursive(source: string, target: string): void {
    const files = fs.readdirSync(source) // 同步读取当前目录
    files.forEach(file => {
      const _src = path.resolve(source, file)
      const _target = path.resolve(target, file)
      fs.stat(_src, (err, stats) => {  // stats  该对象 包含文件属性
        if (err) { throw err }
        if (stats.isFile()) { // 如果是个文件则拷贝
          const readable = fs.createReadStream(_src) // 创建读取流
          const writable = fs.createWriteStream(_target) // 创建写入流
          readable.pipe(writable)
        } else if (stats.isDirectory()) { // 是目录则 递归
          CommonUtils._checkDirectory(_src, _target, CommonUtils.copyFolderRecursive)
        }
      })
    })
  }
  /**
   * 校验目标目录是否存在
   * @param {string} src 源目录
   * @param {string} target 目标目录
   * @param {Function} callback 回调函数
   */
  private static _checkDirectory(src: string, target: string, callback: (source: string, target: string) => void) {
    fs.access(target, fs.constants.F_OK, err => {
      if (err) {
        fs.mkdirSync(target)
      }
      callback.call(this, src, target)
    })
  }
}
