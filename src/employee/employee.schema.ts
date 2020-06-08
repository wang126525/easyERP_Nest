import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

export const employeeSchema = new mongoose.Schema(
  {
    _id: Types.ObjectId,
    empNum: String,
    empName: String,
    empAge: String,
    empSex: String,
    empBirthday: Date,
    empIdCard: String,
    empTel: String,
    empQQ: String,
    empAddress: String,
    empAddressDetail: String,
    empEntryDate: Date,
    empState:Boolean
  },
  { collection: 'employee', versionKey: false },
);
