import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SlotsService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { SlotStatusValidationPipe } from './pipes/slot-status-validation.pipe';
import { GetSlotsFilterDto } from './dto/get-slots-filter.dto';
import { SlotStatus } from './slot-status.enum';
import { UserEntity } from '../user/user.entity';
import { AuthUser } from 'src/main/decorators';
import { SlotDto } from './dto/slot.dto';

@Controller('slots')
@UseGuards(AuthGuard())
export class SlotsController {
  private logger = new Logger('SlotsController');

  constructor(private slotsService: SlotsService) {}

  @Get()
  getSlots(
    @Query(ValidationPipe) filterDto: GetSlotsFilterDto,
    @AuthUser() user: UserEntity
  ): Promise<SlotDto[]> {
    this.logger.verbose(`User "${user.username}" retrieving all slots. Filters: ${JSON.stringify(filterDto)}`);
    return this.slotsService.getSlots(filterDto, user);
  }

  @Get('/:id')
  getSlotById(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: UserEntity
  ): Promise<SlotDto> {
    return this.slotsService.getSlotById( id, user );
  }

  @Post()
  @UsePipes(ValidationPipe)
  createSlot(
    @Body() createSlotDto: CreateSlotDto,
    @AuthUser() user: UserEntity
  ): Promise<SlotDto> {
    this.logger.verbose(`User "${user.username}" creating a new slot. Data: ${JSON.stringify(createSlotDto)}`);
    return this.slotsService.createSlot(createSlotDto, user);
  }

  @Delete('/:id')
  deleteSlot(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: UserEntity
  ): Promise<any> {
    return this.slotsService.deleteSlot(id, user);
  }

  @Patch('/:id/status')
  updateSlotStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', SlotStatusValidationPipe) status: SlotStatus,
    @AuthUser() user: UserEntity
  ): Promise<SlotDto> {
    return this.slotsService.updateSlotStatus(id, status, user);
  }

  @Put('/toggle')
  toggleStatus(
    @Body('id', ParseIntPipe) id: number,
    @AuthUser() user: UserEntity
  ): Promise<any> {
    return this.slotsService.toggleStatus(id, user);
  }

  @Post('/empty')
  getAvailableSlotsByUserId(
    @Body('userId', ParseIntPipe) id: number,
    @AuthUser() user: UserEntity
  ): Promise<SlotDto[]> {
    return this.slotsService.getAvailableSlotsByUserId(id, user);
  }
}
