import { Exclude, Expose, Type } from 'class-transformer';
import { UserRole } from '../user-role.enum';
import { AbstractDto } from '../../../main/dto/abstract.dto';
import { SlotDto } from '../../slot/dto/slot.dto';

@Exclude()
export class UserDto extends AbstractDto{

    @Expose()
    username: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    phone: string;
    
    password: string;

    salt: string;

    @Expose()
    timeStart: string;

    @Expose()
    timeEnd: string;

    @Expose()
    @Type(() => SlotDto)
    slots: SlotDto[];

    @Expose()
    role: UserRole;
}
