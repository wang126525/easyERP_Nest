import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import CommonUtils from '../common/common.util';
import {supplier, supplierParams,SupplierQc,supplierDto} from './supplier.interface';
import { MsgResult, Page } from '../common/common.dto';
// import { promises } from 'dns';
import * as jwt from 'jsonwebtoken';
import { type } from 'os';
import { types } from 'util';

@Injectable()
export class SupplierService {
  constructor(@InjectModel('supplier') private readonly supplierModel: Model<supplier>) {}

  async add(params: supplierParams): Promise<MsgResult> {
    if(params.supplierName==""||params.supplierLegalPerson==""||params.supplierPhone==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const supplier: supplier = await this.supplierModel
      .findOne({ supplierName: params.supplierName, supplierLegalPerson: params.supplierLegalPerson })
      .exec();
    if (!supplier) {
      console.log(params, supplier);
        const id = new Types.ObjectId();
        try {
          const result: supplier = await this.supplierModel.create({
            _id: id,
            supplierNum: id.toString(),
            supplierName: params.supplierName,
            supplierLegalPerson: params.supplierLegalPerson,
            supplierPhone: params.supplierPhone,
            supplierCompanyAddr: params.supplierCompanyAddr,
            supplierCompanyAddrDetail: params.supplierCompanyAddrDetail,
            supplierIsUse: false,
          });
          return Promise.resolve(new MsgResult(true, 'success', result));
        }catch (error){
          return Promise.resolve(new MsgResult(false, `${error}`));
        }
    } else {
      return Promise.resolve(new MsgResult(false, '该供应商已存在'));
    }
  }
  async edit(params: supplierParams): Promise<MsgResult> {
    if(params.supplierName==""||params.supplierLegalPerson==""||params.supplierPhone==""||params.supplierNum==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const result: any = await this.supplierModel
      .updateOne({supplierNum:params.supplierNum},params)
      .exec();
      console.log("查找替换",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '修改失败'));
    }
  }
  async editMany(params: {list:supplierParams[],type:boolean}): Promise<MsgResult> {
    if(params.list.length==0){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const data:string[] = params.list.map(item=>item.supplierNum)
    const result: any = await this.supplierModel
      .updateMany({supplierNum:{$in : data}},{$set:{supplierIsUse:params.type}})
      .exec();
      console.log("查找替换",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '修改失败'));
    }
  }
  async delete(params: supplierParams): Promise<MsgResult> {
    if(params.supplierNum==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const result: any = await this.supplierModel
      .deleteOne({supplierNum:params.supplierNum})
      .exec();
      console.log("删除",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '删除失败'));
    }
  }
  async deleteMany(params: supplierParams[]): Promise<MsgResult> {
    if(params.length==0){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const list:string[] = params.map(item=>item.supplierNum)
    const result: any = await this.supplierModel
      .deleteMany({supplierNum:{$in:list}})
      .exec();
      console.log("批量删除",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '批量删除失败'));
    }
  }
  async find(supplierDto:supplierDto,page:Page):Promise<MsgResult>{
    console.log("2",supplierDto,page)
    const searchParam = new SupplierQc(supplierDto)
    const supplier:supplier[] =  await this.supplierModel.countDocuments(searchParam).exec().then((cnt: number) => {
      page.total = cnt
      return this.supplierModel.find(searchParam).skip(page.start).limit(page.limit).exec()
    })
    page.data = supplier
    return Promise.resolve(new MsgResult(true,"success",page))
  }
  
  
  
}
