import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

export const goodsTypeSchema = new mongoose.Schema(
  {
    _id: Types.ObjectId,
    goodstypeNum: String,
    goodstypeName: String,
    goodstypeAddTime: Date,
    goodstypeState: Boolean,
    
  },
  { collection: 'goodstype', versionKey: false },
);
