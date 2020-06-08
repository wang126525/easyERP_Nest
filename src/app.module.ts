import { Module } from '@nestjs/common';
import { LoginController, GetUserInfoController } from './login/login.controller';
import { SupplierController } from './supplier/supplier.controller';
import { EmployeeController } from './employee/employee.controller';
import { GoodsController } from './goods/goods.controller';
import { LoginService } from './login/login.service';
import { SupplierService } from './supplier/supplier.service';
import { EmployeeService } from './employee/employee.service';
import { GoodsService } from './goods/goods.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginSchema,UserSchema } from './login/login.schema';
import { supplierSchema } from './supplier/supplier.schema';
import { employeeSchema } from './employee/employee.schema';
import { goodsSchema } from './goods/goods.schema';



const  dbConfig = require('../db.json') ;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db_name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: dbConfig.user,
      pass: dbConfig.password,
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema},
      { name: 'Login', schema: LoginSchema},
      { name: 'supplier', schema: supplierSchema},
      { name: 'employee', schema: employeeSchema},
      { name: 'goods', schema: goodsSchema},
    ]),
  ],
  controllers: [LoginController,GetUserInfoController,SupplierController,EmployeeController,GoodsController],
  providers: [LoginService,SupplierService,EmployeeService,GoodsService],
})
export class AppModule {}
