import { Module } from '@nestjs/common';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { View } from './entity/view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([View])
  ],
  controllers: [ViewsController],
  providers: [ViewsService],
  exports: [ViewsService]
})
export class ViewsModule {}
