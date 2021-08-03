import { EntityRepository, Repository } from 'typeorm';
import { CreateSlotDto } from './dto/create-slot.dto';
import { GetSlotsFilterDto } from './dto/get-slots-filter.dto';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { SlotDto } from './dto/slot.dto';
import { SlotEntity } from './slot.entity';
import { plainToClass } from 'class-transformer';
import { SlotStatus } from './slot-status.enum';

@EntityRepository(SlotEntity)
export class SlotRepository extends Repository<SlotEntity> {
  private logger = new Logger('SlotRepository');

  async getSlots(filterDto: GetSlotsFilterDto, user: UserEntity): Promise<SlotDto[]> {
    const { status } = filterDto;
    const query = this.createQueryBuilder('slot');

    if (status) {
      query.andWhere('slot.status = :status', { status });
    }

    try {
      const slots = await query
                      .leftJoinAndSelect("slot.user", "user")
                      .getMany();
      return plainToClass(SlotDto, slots);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createSlot(createSlotDto: CreateSlotDto, user: UserEntity): Promise<SlotDto> {
    const { timeStart, timeEnd } = createSlotDto;

    const slot = new SlotEntity();
    slot.timeStart = timeStart;
    slot.timeEnd = timeEnd;
    slot.user = user;

    try {
      const result = await this.save(slot);
      return plainToClass(SlotDto, result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async reserveSlot(id: number, user: UserEntity): Promise<SlotDto> {

    const found = await this.findOne({ where: { id: id} , relations: ["user"]});
    found.status = found.status == SlotStatus.OPEN ? SlotStatus.BOOKED : SlotStatus.OPEN;
    found.refUserId = parseInt(user.id);

    try {
      const result = await this.save(found);
      return plainToClass(SlotDto, result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getAvailableSlots(id: number, user: UserEntity): Promise<SlotDto[]> {
    const query = this.createQueryBuilder('slot');
    const status = SlotStatus.OPEN;
    try {
      const slots = await query
        .where("slot.refUserId IS NULL")
        .andWhere('slot.status = :status', {status})
        .getMany();
      return plainToClass(SlotDto, slots);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
