import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { SlotRepository } from './slot.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SlotRepository]),
        AuthModule,
      ],
      controllers: [SlotsController],
      providers: [SlotsService],
})
export class SlotModule {}
