import { BaseEntity, Entity, Column, ManyToOne } from 'typeorm';
import { SlotStatus } from './slot-status.enum';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../../main/abstract.entity';

@Entity({ name: 'slot' })
export class SlotEntity extends AbstractEntity{

  @Column({ nullable: true})
  timeStart: string;

  @Column({ nullable: true})
  timeEnd: string;

  @Column({
    type: "enum",
    enum: SlotStatus,
    default: SlotStatus.OPEN
  })
  status: SlotStatus;

  @ManyToOne(type => UserEntity, user => user.slots, { eager: false})
  user: UserEntity;

  @Column()
  userId: number;

}
