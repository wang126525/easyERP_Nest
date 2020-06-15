import { Document, Types } from 'mongoose'
import BaseQc from '../common/base.qc'
import CommonUtils from '../common/common.util'
import { IsNotEmpty,Length,Matches,ValidateIf,IsMobilePhone } from 'class-validator';

/**
 * 员工列表
 */
export class employeeDto {
  _id: Types.ObjectId
  empNum:string//编码
  @IsNotEmpty({message:'请输入姓名'})
  empName:string//名称
  @IsNotEmpty({message:'请输入年龄'})
  empAge:string//年龄
  empSex:string//性别
  empBirthday:Date//生日
  @IsNotEmpty({message:'请输入身份证号'})
  empIdCard:string//身份证号
  @IsNotEmpty({message:'请输入电话'})
  @IsMobilePhone('zh-CN',{},{message:'请输入正确的手机号'})
  empTel:string//电话
  @IsNotEmpty({message:'请输入QQ'})
  empQQ:string//QQ
  empAddress:string//地址
  empAddressDetail:string//地址
  empEntryDate:Date//入职时间
  empState:boolean//状态
}
export interface employee extends Document,employeeDto {
  _id: Types.ObjectId
}

/**
 * 模糊查询列表处理
 */
export class EmployeeQc extends BaseQc {
  $or?:{[propname:string]:{$regex:RegExp}}[]
  constructor(employeeDto: employeeDto) {
    super()
    if (employeeDto.content) { // mongodb的模糊搜索使用正则形式
      this.$or = [
        {empName:{ $regex: new RegExp(CommonUtils.escapeRegexStr(employeeDto.content))}},
        // {supplierLegalPerson:{ $regex: new RegExp(CommonUtils.escapeRegexStr(employeeDto.content))}}
      ]
    }
  }

}



/**
 * 模糊查询对象
 */
export interface employeeDto {
  /**
   * 内容模糊搜索
   */
  content: string
  /**
   * text	返回纯净文本
   * json	返回不进行unicode转码的json文本(默认)
   */
  format?: string
}

/**
 * 添加/编辑员工传参
 */
export interface employeeParams {
  empNum?:string//编码
  empName?:string//名称
  empAge?:string//年龄
  empSex?:string//性别
  empBirthday?:Date//生日
  empIdCard?:string//身份证号
  empTel?:string//电话
  empQQ?:string//QQ
  empAddress?:string//地址
  empAddressDetail?:string,//详细地址
  empEntryDate?:Date//入职日期
  empState?:boolean//状态
}


