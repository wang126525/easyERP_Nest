import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import CommonUtils from '../common/common.util';
import {employee, employeeParams,EmployeeQc,employeeDto} from './employee.interface';
import { MsgResult, Page } from '../common/common.dto';
// import { promises } from 'dns';
import * as jwt from 'jsonwebtoken';
import { type } from 'os';
import { types } from 'util';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel('employee') private readonly employeeModel: Model<employee>) {}
  async add(params: employeeParams): Promise<MsgResult> {
    if(params.empName==""||params.empIdCard==""||params.empTel==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const employee: employee = await this.employeeModel
      .findOne({ empName: params.empName, empIdCard: params.empIdCard })
      .exec();
    if (!employee) {
      console.log(params, employee);
        const id = new Types.ObjectId();
        try {
          const result: employee = await this.employeeModel.create({
            _id: id,
            empNum: id.toString(),
            empName: params.empName,
            empAge: params.empAge,
            empSex: params.empSex,
            empBirthday: params.empBirthday,
            empIdCard: params.empIdCard,
            empTel: params.empTel,
            empQQ: params.empQQ,
            empAddress: params.empAddress,
            empAddressDetail: params.empAddressDetail,
            empEntryDate: params.empEntryDate,
            empState:true
          });
          return Promise.resolve(new MsgResult(true, 'success', result));
        }catch (error){
          return Promise.resolve(new MsgResult(false, `${error}`));
        }
    } else {
      return Promise.resolve(new MsgResult(false, '该员工已存在'));
    }
  }
  async edit(params: employeeParams): Promise<MsgResult> {
    if(params.empName==""||params.empIdCard==""||params.empTel==""||params.empNum==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const result: any = await this.employeeModel
      .updateOne({empNum:params.empNum},params)
      .exec();
      console.log("查找替换",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '修改失败'));
    }
  }
  async editMany(params: {list:employeeParams[],type:boolean}): Promise<MsgResult> {
    if(params.list.length==0){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const data:string[] = params.list.map(item=>item.empNum)
    const result: any = await this.employeeModel
      .updateMany({empNum:{$in : data}},{$set:{employeeIsUse:params.type}})
      .exec();
      console.log("查找替换",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '修改失败'));
    }
  }
  async delete(params: employeeParams): Promise<MsgResult> {
    if(params.empNum==""){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const result: any = await this.employeeModel
      .deleteOne({empNum:params.empNum})
      .exec();
      console.log("删除",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '删除失败'));
    }
  }
  async deleteMany(params: employeeParams[]): Promise<MsgResult> {
    if(params.length==0){
      return Promise.resolve(new MsgResult(false, '参数错误'));
    }
    const list:string[] = params.map(item=>item.empNum)
    const result: any = await this.employeeModel
      .deleteMany({empNum:{$in:list}})
      .exec();
      console.log("批量删除",result)
    if (result&&result.ok==1) {
      return Promise.resolve(new MsgResult(true, 'success'));
    } else {
      return Promise.resolve(new MsgResult(false, '批量删除失败'));
    }
  }
  async find(employeeDto:employeeDto,page:Page):Promise<MsgResult>{
    console.log("2",employeeDto,page)
    const searchParam = new EmployeeQc(employeeDto)
    const employee:employee[] =  await this.employeeModel.countDocuments(searchParam).exec().then((cnt: number) => {
      page.total = cnt
      return this.employeeModel.find(searchParam).skip(page.start).limit(page.limit).exec()
    })
    page.data = employee
    return Promise.resolve(new MsgResult(true,"success",page))
  }
  
  
  
}
