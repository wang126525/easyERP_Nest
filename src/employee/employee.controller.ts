import { Controller, Get, Post, Body, Query, UseInterceptors, ValidationPipe,UseFilters } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MsgResult, Page } from '../common/common.dto';
import { employee, employeeParams,EmployeeQc,employeeDto } from './employee.interface';
import LoginInterceptor from '../common/login.interceptor';
import {HttpExceptionFilter} from '../common/http-exception.filter';
// import { query } from 'express';
import PageTransform from '../common/page.transform'


@UseInterceptors(LoginInterceptor)
@Controller("/api/employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post("add")
  @UseFilters(HttpExceptionFilter)
  addEmployee(@Body(ValidationPipe) params:employeeDto):Promise<MsgResult>{

    return this.employeeService.add(params);
  }

  @Post("edit")
  @UseFilters(HttpExceptionFilter)
  editEmployee(@Body(ValidationPipe) params:employeeDto):Promise<MsgResult>{
    console.log("edit",params)
    return this.employeeService.edit(params);
  }

  @Post("editMany")
  editManyEmployee(@Body() params:{list:employeeParams[],type:boolean}):Promise<MsgResult>{
    console.log("edit",params)
    return this.employeeService.editMany(params);
  }

  @Post("delete")
  deleteEmployee(@Body() params:employeeParams):Promise<MsgResult>{
    console.log("delete",params)
    return this.employeeService.delete(params);
  }

  @Post("deleteMany")
  deleteManyEmployee(@Body() params:employeeParams[]):Promise<MsgResult>{
    console.log("delete",params)
    return this.employeeService.deleteMany(params);
  }

  @Get("pagination")
  getEmployeeList(@Query() employeeDto: employeeDto, @Query(PageTransform) page: Page): Promise<MsgResult> {

    return this.employeeService.find(employeeDto,page);
  }


  
}
