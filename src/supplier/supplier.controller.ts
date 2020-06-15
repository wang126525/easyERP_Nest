import { Controller, Get, Post, Body, Query, UseInterceptors, ValidationPipe,UseFilters } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { MsgResult, Page } from '../common/common.dto';
import { supplier, supplierParams,SupplierQc,supplierDto } from './supplier.interface';
import LoginInterceptor from '../common/login.interceptor';
import {HttpExceptionFilter} from '../common/http-exception.filter';
// import { query } from 'express';
import PageTransform from '../common/page.transform'


@UseInterceptors(LoginInterceptor)
@Controller("/api/supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post("add")
  @UseFilters(HttpExceptionFilter)
  addSupplier(@Body(ValidationPipe) params:supplierDto):Promise<MsgResult>{

    return this.supplierService.add(params);
  }

  @Post("edit")
  @UseFilters(HttpExceptionFilter)
  editSupplier(@Body(ValidationPipe) params:supplierDto):Promise<MsgResult>{
    console.log("edit",params)
    return this.supplierService.edit(params);
  }

  @Post("editMany")
  editManySupplier(@Body() params:{list:supplierParams[],type:boolean}):Promise<MsgResult>{
    console.log("edit",params)
    return this.supplierService.editMany(params);
  }

  @Post("delete")
  deleteSupplier(@Body() params:supplierParams):Promise<MsgResult>{
    console.log("delete",params)
    return this.supplierService.delete(params);
  }

  @Post("deleteMany")
  deleteManySupplier(@Body() params:supplierParams[]):Promise<MsgResult>{
    console.log("delete",params)
    return this.supplierService.deleteMany(params);
  }

  @Get("pagination")
  getSupplierList(@Query() supplierDto: supplierDto, @Query(PageTransform) page: Page): Promise<MsgResult> {

    return this.supplierService.find(supplierDto,page);
  }


  
}
