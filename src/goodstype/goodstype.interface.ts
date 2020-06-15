import { Document, Types } from 'mongoose'
import { IsNotEmpty} from 'class-validator'
import BaseQc from '../common/base.qc'
import CommonUtils from '../common/common.util'

/**
 * 商品分类
 */

export class goodstypeDto {
  _id: Types.ObjectId
  goodstypeNum:string//编码
  @IsNotEmpty({message:"名称不能为空"})
  goodstypeName:string//名称
  goodstypeAddTime:Date//添加时间
  goodstypeState:boolean//状态
}

export interface goodstype extends goodstypeDto, Document {
  _id: Types.ObjectId
}


/**
 * 添加/编辑商品分类传参
 */
export interface goodstypeParams {
  goodstypeNum?:string//编码
  goodstypeName?:string//名称
  goodstypeAddTime?:Date//添加日期
  goodstypeState?:boolean//状态
}

/**
 * 模糊查询列表处理
 */
export class GoodsTypeQc extends BaseQc {
  $or?:{[propname:string]:{$regex:RegExp}}[]
  constructor(goodstypeDto: goodstypeDto) {
    super()
    if (goodstypeDto.content) { // mongodb的模糊搜索使用正则形式
      this.$or = [
        {goodstypeName:{ $regex: new RegExp(CommonUtils.escapeRegexStr(goodstypeDto.content))}},
      ]
    }
  }

}



/**
 * 模糊查询对象
 */
export interface goodstypeDto {
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


