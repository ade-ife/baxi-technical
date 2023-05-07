import { Logger, Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './modules/records/records.module';
import { RecordsService } from './modules/records/records.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Record } from "./modules/records/record.entity";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "database-username",
    password: "database-password",
    database: "database-name",
    entities: [Record],
    synchronize: true
  }), TypeOrmModule.forFeature([Record]), RecordsModule],
  controllers: [AppController],
  providers: [AppService, RecordsService],
})
export class AppModule {

  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.logger.log(`Application initialized.`);
  }
}
