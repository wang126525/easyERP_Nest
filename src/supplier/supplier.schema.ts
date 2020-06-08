import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

export const supplierSchema = new mongoose.Schema(
  {
    _id: Types.ObjectId,
    supplierNum: String, //供应商编码
    supplierName: String, //供应商名称
    supplierLegalPerson: String, //供应商法人
    supplierPhone: String, //供应商电话
    supplierCompanyAddr: String, //供应商公司地址
    supplierCompanyAddrDetail: String, //供应商详细地址
    supplierIsUse: Boolean, //使用启用
  },
  { collection: 'supplier', versionKey: false },
);
