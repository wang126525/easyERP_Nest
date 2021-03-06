import { Controller, Get, Post, Body, Query, UseInterceptors, ValidationPipe, UseFilters } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { MsgResult, Page } from '../common/common.dto';
import { goods, goodsParams,GoodsQc,goodsDto } from './goods.interface';
import LoginInterceptor from '../common/login.interceptor';
import {TransformInterceptor} from '../common/httpException.interceptor';
import {HttpExceptionFilter} from '../common/http-exception.filter';
// import { query } from 'express';
import PageTransform from '../common/page.transform'

@UseInterceptors(LoginInterceptor)
@Controller("/api/goods")
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post("add")
  @UseFilters(HttpExceptionFilter)
  addGoods(@Body(new ValidationPipe()) params:goodsDto):Promise<MsgResult>{

    return this.goodsService.add(params);
  }

  @Post("edit")
  @UseFilters(HttpExceptionFilter)
  editGoods(@Body(new ValidationPipe()) params:goodsDto):Promise<MsgResult>{
    console.log("edit",params)
    return this.goodsService.edit(params);
  }

  @Post("editMany")
  editManyGoods(@Body() params:{list:goodsParams[],type:boolean}):Promise<MsgResult>{
    console.log("edit",params)
    return this.goodsService.editMany(params);
  }

  @Post("delete")
  deleteGoods(@Body() params:goodsParams):Promise<MsgResult>{
    console.log("delete",params)
    return this.goodsService.delete(params);
  }

  @Post("deleteMany")
  deleteManyGoods(@Body() params:goodsParams[]):Promise<MsgResult>{
    console.log("delete",params)
    return this.goodsService.deleteMany(params);
  }

  @Get("pagination")
  getGoodsList(@Query() goodsDto: goodsDto, @Query(PageTransform) page: Page): Promise<MsgResult> {

    return this.goodsService.find(goodsDto,page);
  }


  
}
