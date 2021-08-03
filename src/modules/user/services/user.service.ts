import {
  BadRequestException,
  Dependencies,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../user.entity';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { AuthService } from '../../auth/services/auth.service';
import { UserRole } from '../user-role.enum';
import { FindUserDto } from '../dto/find-user.dto';

@Injectable()
@Dependencies(AuthService)
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async getUsers({page, limit}): Promise<UserDto[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    try {
      const users = await queryBuilder
                          .skip(limit * (page-1))
                          .take(limit)
                          .getMany();

      return plainToClass(UserDto, users);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: number, user: UserEntity): Promise<UserDto> {
    const found : UserEntity = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return plainToClass(UserDto, found);
  }

  async deleteUser(id: number, user: UserEntity): Promise<any> {

    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(`Authenticated user should have ADMIN role`);
    }

    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return Promise.resolve({
      result: result,
      status: 'success'
    });
  }

  async createUser(createUserDto: CreateUserDto, user: UserEntity): Promise<UserDto> {
    return this.userRepository.createUser(createUserDto, user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, user: UserEntity): Promise<UserDto> {

    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(`Authenticated user should have ADMIN role`);
    }
    
    const found = await this.userRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    try {
      this.userRepository.merge(found, updateUserDto);
      const result = await this.userRepository.save(found);
      return plainToClass(UserDto, result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async findUsers(findUserDto: FindUserDto, user: UserEntity): Promise<UserDto[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    try {
      const users = await queryBuilder
        .where("LOWER(user.firstName) like :firstName", { firstName:`%${findUserDto.firstName.toLowerCase()}%` })
        .andWhere("LOWER(user.lastName) like :lastName", { lastName:`%${findUserDto.lastName.toLowerCase()}%` })
        .orderBy("user.id", "DESC")
        .getMany();

      return plainToClass(UserDto, users);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
