import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import CommonUtils from '../common/common.util';
import {goods, goodsParams,GoodsQc,goodsDto} from './goods.interface';
import { MsgResult, Page } from '../common/common.dto';
// import { promises } from 'dns';
import * as jwt from 'jsonwebtoken';
import { type } from 'os';
import { types } from 'util';

@Injectable()
export class GoodsService {
  constructor(@InjectModel('goods') private readonly goodsModel: Model<goods>) {}
  async add(params: goodsParams): Promise<MsgResult> {
    if(params.goodsName==""||params.goodsType==""||params.goodsModel==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const goods: goods = await this.goodsModel
      .findOne({ goodsName: params.goodsName, goodsModel: params.goodsModel })
      .exec();
    if (!goods) {
      console.log(params, goods);
        const id = new Types.ObjectId();
        try {
          const result: goods = await this.goodsModel.create({
            _id: id,
            goodsNum: id,
            goodsName: params.goodsName,
            goodsType: params.goodsType,
            goodsUnit: params.goodsUnit,
            goodsModel: params.goodsModel,
            goodsSpec: params.goodsSpec,
            stockPrice: params.stockPrice,
            goodsPrice: params.goodsPrice,
            supplierName: params.supplierName,
            goodsAddTime: params.goodsAddTime,
            goodsState:true
          });
          return Promise.resolve(new MsgResult(true, 'success', result));
        }catch (error){
          return Promise.resolve(new MsgResult(false, `${error}`));
        }
    } else {
      return Promise.resolve(new MsgResult(false, '该商品已存在'));
    }
  }
  async edit(params: goodsParams): Promise<MsgResult> {
    if(params.goodsName==""||params.goodsType==""||params.goodsModel==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const result: any = await this.goodsModel
      .updateOne({goodsNum:params.goodsNum},params)
      .exec();
      console.log("查找替换",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '修改失败'));
    }
  }
  async editMany(params: {list:goodsParams[],type:boolean}): Promise<MsgResult> {
    if(params.list.length==0){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const data:string[] = params.list.map(item=>item.goodsNum)
    const result: any = await this.goodsModel
      .updateMany({goodsNum:{$in : data}},{$set:{goodsState:params.type}})
      .exec();
      console.log("查找替换",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '修改失败'));
    }
  }
  async delete(params: goodsParams): Promise<MsgResult> {
    if(params.goodsNum==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const result: any = await this.goodsModel
      .deleteOne({goodsNum:params.goodsNum})
      .exec();
      console.log("删除",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '删除失败'));
    }
  }
  async deleteMany(params: goodsParams[]): Promise<MsgResult> {
    if(params.length==0){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const list:string[] = params.map(item=>item.goodsNum)
    const result: any = await this.goodsModel
      .deleteMany({goodsNum:{$in:list}})
      .exec();
      console.log("批量删除",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '批量删除失败'));
    }
  }
  async find(goodsDto:goodsDto,page:Page):Promise<MsgResult>{
    console.log("2",goodsDto,page)
    const searchParam = new GoodsQc(goodsDto)
    const goods:goods[] =  await this.goodsModel.countDocuments(searchParam).exec().then((cnt: number) => {
      page.total = cnt
      return this.goodsModel.find(searchParam).skip(page.start).limit(page.limit).exec()
    })
    page.data = goods
    return Promise.resolve(new MsgResult(true,"success",page))
  }
  
  
  
}
