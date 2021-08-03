import { Exclude, Expose, Type } from 'class-transformer';
import { AbstractDto } from '../../../main/dto/abstract.dto';
import { SlotStatus } from '../slot-status.enum';
import { UserDto } from '../../user/dto/user.dto';

@Exclude()
export class SlotDto extends AbstractDto{
  
    @Expose()
    status: SlotStatus;

    @Expose()
    timeStart: string;

    @Expose()
    timeEnd: string;
  
    @Expose()
    userId: number;
    
    @Expose()
    @Type(() => UserDto)
    user: UserDto;
}
