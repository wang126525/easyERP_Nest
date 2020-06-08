import { Document, Types } from 'mongoose'
import BaseQc from '../common/base.qc'
import CommonUtils from '../common/common.util'

/**
 * 商品列表
 */
export interface goods extends Document {
  _id: Types.ObjectId
  goodsNum:string//编码
  goodsName:string//名称
  goodsType:string//类型
  goodsUnit:string//单位
  goodsModel:string//型号
  goodsSpec:string//规格
  stockPrice:string//进价
  goodsPrice:string//价格
  supplierName:string//供应商
  goodsAddTime:Date//添加时间
  goodsState:boolean//状态

}

/**
 * 模糊查询列表处理
 */
export class GoodsQc extends BaseQc {
  $or?:{[propname:string]:{$regex:RegExp}}[]
  constructor(goodsDto: goodsDto) {
    super()
    if (goodsDto.content) { // mongodb的模糊搜索使用正则形式
      this.$or = [
        {empName:{ $regex: new RegExp(CommonUtils.escapeRegexStr(goodsDto.content))}},
        // {supplierLegalPerson:{ $regex: new RegExp(CommonUtils.escapeRegexStr(goodsDto.content))}}
      ]
    }
  }

}



/**
 * 模糊查询对象
 */
export interface goodsDto {
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
export interface goodsParams {
  goodsNum?:string//编码
  goodsName?:string//名称
  goodsType?:string//类型
  goodsUnit?:string//单位
  goodsModel?:string//型号
  goodsSpec?:string//规格
  stockPrice?:string//进价
  goodsPrice?:string//价格
  supplierName?:string//供应商
  goodsAddTime?:Date//添加日期
  goodsState?:boolean//状态
}


