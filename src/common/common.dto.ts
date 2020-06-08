export interface Page {
  start: number; // 起始数据行(从0开始)
  page: number; // 当前页码
  limit: number; // 每页数据数量
  total: number; // 数据总数
  data: object[]; // 当前页数据
}

export class MsgResult {
  constructor(
    private readonly status: boolean,
    private readonly msg: string,
    private readonly data?: object,
  ) {}

  getStatus() {
    return this.status;
  }
  getMsg() {
    return this.msg;
  }
}

export interface FileEntity {
    fieldname: string // 文件字段
    originalname: string // 文件名
    encoding: string // 文件编码
    mimetype: string // MIME
    buffer: Buffer // 文件字节码
    size: number // 文件体积
  }

