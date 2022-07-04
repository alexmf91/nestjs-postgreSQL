import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user)
      throw new NotFoundException(`The user with '${id}' was not found.`);

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({
      email: createUserDto.email
    });

    if (existingUser)
      throw new ConflictException(
        `The user with email:'${createUserDto.email}' already exist.`
      );

    return this.usersRepository.save(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({ id });

    if (!existingUser)
      throw new NotFoundException(`The user with id '${id}' was not found.`);

    await this.usersRepository.update(id, updateUserDto);

    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const existingUser = await this.usersRepository.findOneBy({ id });

    if (!existingUser)
      throw new NotFoundException(`The user with id '${id}' was not found.`);

    await this.usersRepository.remove(existingUser);

    return {
      statusCode: 200,
      message: `The user with id '${id}' has been deleted succesfully`
    };
  }
}
