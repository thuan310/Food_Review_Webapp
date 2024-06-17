import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { FoodsModule } from './foods/foods.module';
import { ImagesModule } from './images/images.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { table } from 'console';
import { ViewsModule } from './views/views.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import path from 'path';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',  
    isGlobal: true,
  }),TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      autoLoadEntities: true,
      synchronize: true,
      schemaGenerator: {
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
      }
    }),
    inject: [ConfigService],
  }), CategoriesModule, FoodsModule, ImagesModule, ReviewsModule, UsersModule, AuthModule, ViewsModule, FeedbacksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
