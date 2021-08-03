import { Entity, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserRole } from './user-role.enum';
import { AbstractEntity } from '../../main/abstract.entity';


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

  
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

}
