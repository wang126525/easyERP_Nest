import { Document, Types } from 'mongoose'
import BaseQc from '../common/base.qc'
import CommonUtils from '../common/common.util'
import { IsNotEmpty,Length,Matches,ValidateIf,IsMobilePhone } from 'class-validator';

/**
 * 供应商列表
 */
export class supplierDto {
  _id: Types.ObjectId
  supplierNum:string//供应商编码
  @IsNotEmpty({message:'请输入供应商名称'})
  supplierName: string//供应商名称
  @IsNotEmpty({message:'请输入供应商法人'})
  supplierLegalPerson: string//供应商法人
  @IsNotEmpty({message:'请输入手机号'})
  @IsMobilePhone('zh-CN',{},{message:'请输入正确的手机号'})
  supplierPhone: string//供应商电话
  supplierCompanyAddr: string//供应商公司地址
  supplierCompanyAddrDetail: string//供应商详细地址
  supplierIsUse:boolean//使用启用

}

export interface supplier extends Document,supplierDto {
  _id: Types.ObjectId
}

/**
 * 模糊查询列表处理
 */
export class SupplierQc extends BaseQc {
  $or?:{[propname:string]:{$regex:RegExp}}[]
  constructor(supplierDto: supplierDto) {
    super()
    if (supplierDto.content) { // mongodb的模糊搜索使用正则形式 查询公司名称和法人代表
      this.$or = [
        {supplierName:{ $regex: new RegExp(CommonUtils.escapeRegexStr(supplierDto.content))}},
        {supplierLegalPerson:{ $regex: new RegExp(CommonUtils.escapeRegexStr(supplierDto.content))}}
      ]
    }
  }

}



/**
 * 模糊查询对象
 */
export interface supplierDto {
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
 * 添加/编辑供应商传参
 */
export interface supplierParams {
  supplierNum?:string//供应商编码
  supplierName?: string//供应商名称
  supplierLegalPerson?: string//供应商法人
  supplierPhone?: string//供应商电话
  supplierCompanyAddr?: string//供应商公司地址
  supplierCompanyAddrDetail?: string//供应商详细地址
  supplierIsUse?:boolean//使用启用

}


