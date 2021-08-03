import { Entity, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserRole } from './user-role.enum';
import { AbstractEntity } from '../../main/abstract.entity';
import { SlotEntity } from '../slot/slot.entity';


@Entity({ name: 'user' })
@Unique(['username'])
export class UserEntity extends AbstractEntity {

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column({ nullable: false})
  password: string;
  
  @Column()
  salt: string;

  @Column({default: '', nullable: true})
  phone?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.GHOST
  })
  role: UserRole

  @Column({nullable: true, type: 'timestamp'})
  timeStart: Date;

  @Column({nullable: true, type: 'timestamp'})
  timeEnd: Date;

  @OneToMany(type => SlotEntity, slot => slot.user, { eager: true, cascade: true})
  slots: SlotEntity[];
  
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

}
