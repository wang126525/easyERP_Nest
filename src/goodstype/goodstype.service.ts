import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {goodstype, goodstypeParams,goodstypeDto,GoodsTypeQc} from './goodstype.interface';
import { MsgResult, Page } from '../common/common.dto';
// import { promises } from 'dns';

@Injectable()
export class GoodsTypeService {
  constructor(@InjectModel('goodstype') private readonly goodstypeModel: Model<goodstype>) {}
  async add(params: goodstypeParams): Promise<MsgResult> {
    if(params.goodstypeName==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const goodstype: goodstype = await this.goodstypeModel
      .findOne({ goodstypeName: params.goodstypeName})
      .exec();
    if (!goodstype) {
      console.log(params, goodstype);
        const id = new Types.ObjectId();
        try {
          const result: goodstype = await this.goodstypeModel.create({
            _id: id,
            goodstypeNum: id.toString(),
            goodstypeName: params.goodstypeName,
            goodstypeAddTime: params.goodstypeAddTime,
            goodstypeState: true,
            
          });
          return Promise.resolve(new MsgResult(true, 'success', result));
        }catch (error){
          return Promise.resolve(new MsgResult(false, `${error}`));
        }
    } else {
      return Promise.resolve(new MsgResult(false, '该商品分类已存在'));
    }
  }
  async edit(params: goodstypeParams): Promise<MsgResult> {
    if(params.goodstypeName==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const result: any = await this.goodstypeModel
      .updateOne({goodstypeNum:params.goodstypeNum},params)
      .exec();
      console.log("查找替换",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '修改失败'));
    }
  }
  async editMany(params: {list:goodstypeParams[],type:boolean}): Promise<MsgResult> {
    if(params.list.length==0){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const data:string[] = params.list.map(item=>item.goodstypeNum)
    const result: any = await this.goodstypeModel
      .updateMany({goodstypeNum:{$in : data}},{$set:{goodstypeState:params.type}})
      .exec();
      console.log("查找替换",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '修改失败'));
    }
  }
  async delete(params: goodstypeParams): Promise<MsgResult> {
    if(params.goodstypeNum==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const result: any = await this.goodstypeModel
      .deleteOne({goodstypeNum:params.goodstypeNum})
      .exec();
      console.log("删除",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '删除失败'));
    }
  }
  async deleteMany(params: goodstypeParams[]): Promise<MsgResult> {
    if(params.length==0){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const list:string[] = params.map(item=>item.goodstypeNum)
    const result: any = await this.goodstypeModel
      .deleteMany({goodstypeNum:{$in:list}})
      .exec();
      console.log("批量删除",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '批量删除失败'));
    }
  }
  async find(goodsDto:goodstypeDto,page:Page):Promise<MsgResult>{
    console.log("2",goodsDto,page)
    const searchParam = new GoodsTypeQc(goodsDto)
    const goods:goodstype[] =  await this.goodstypeModel.countDocuments(searchParam).exec().then((cnt: number) => {
      page.total = cnt
      return this.goodstypeModel.find(searchParam).skip(page.start).limit(page.limit).exec()
    })
    page.data = goods
    return Promise.resolve(new MsgResult(true,"success",page))
  }
  
  
  
  
}
