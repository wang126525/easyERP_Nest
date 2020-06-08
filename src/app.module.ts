import { Module } from '@nestjs/common';
import { LoginController, GetUserInfoController } from './login/login.controller';
import { SupplierController } from './supplier/supplier.controller';
import { LoginService } from './login/login.service';
import { SupplierService } from './supplier/supplier.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginSchema,UserSchema } from './login/login.schema';
import { supplierSchema } from './supplier/supplier.schema';



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
    ]),
  ],
  controllers: [LoginController,GetUserInfoController,SupplierController],
  providers: [LoginService,SupplierService],
})
export class AppModule {}
