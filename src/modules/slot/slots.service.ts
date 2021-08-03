import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { GetSlotsFilterDto } from './dto/get-slots-filter.dto';
import { SlotRepository } from './slot.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SlotStatus } from './slot-status.enum';
import { UserEntity } from '../user/user.entity';
import { SlotDto } from './dto/slot.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SlotsService {

  constructor(@InjectRepository(SlotRepository) private slotRepository: SlotRepository) {}

  async getSlots(filterDto: GetSlotsFilterDto, user: UserEntity): Promise<SlotDto[]> {
    return this.slotRepository.getSlots(filterDto, user);
  }

  async getSlotById(id: number, user: UserEntity): Promise<SlotDto> {
    const found = await this.slotRepository.findOne({ where: { id: id} , relations: ["user"]});

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return plainToClass(SlotDto, found);
  }

  async createSlot(createSlotDto: CreateSlotDto, user: UserEntity): Promise<SlotDto> {
    const queryBuilder = this.slotRepository.createQueryBuilder('slot');

    const slotsCount = await queryBuilder
      .where(`slot.timeStart  >= '${createSlotDto.timeStart}'`)
      .andWhere(`slot.timeEnd  <= '${createSlotDto.timeEnd}'`)
      .getCount();
    if (slotsCount > 0) {
      throw new ConflictException(`This time period already recorded to slot `);
    }

    return this.slotRepository.createSlot(createSlotDto, user);
  }

  async deleteSlot(id: number, user: UserEntity): Promise<any> {
    const result = await this.slotRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return Promise.resolve({
      result: result,
      status: 'success'
    });
  }

  async updateSlotStatus(id: number, status: SlotStatus, user: UserEntity): Promise<SlotDto> {
    const slot = await this.getSlotById(id, user);
    slot.status = status;
    await this.slotRepository.save(slot);
    return slot;
  }
}
