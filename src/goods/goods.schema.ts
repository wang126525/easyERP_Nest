import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

export const goodsSchema = new mongoose.Schema(
  {
    _id: Types.ObjectId,
    goodsNum: String,
    goodsName: String,
    goodsType: String,
    goodsUnit: String,
    goodsModel: String,
    goodsSpec: String,
    stockPrice: String,
    goodsPrice: String,
    supplierName: String,
    goodsAddTime: Date,
    goodsState:Boolean
  },
  { collection: 'goods', versionKey: false },
);
