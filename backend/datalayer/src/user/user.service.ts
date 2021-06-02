import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectEntityManager} from "@nestjs/typeorm";
import {EntityManager} from "typeorm";
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager : EntityManager){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.manager.create(User, createUserDto);
    return this.manager.save(user);
  }

  async findAll(): Promise <User[]> {
    return this.manager.find(User, { relations : ["question"]});
  }

  async findOne(id: number) : Promise <User> {
    const user = await this.manager.findOne(User,id,{relations:["question"]});
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise <User> {
    return this.manager.transaction( async manager =>
    {
      const user=await manager.findOne(User,id,{relations:["question"]});
      if (!user) throw new NotFoundException(`User ${id} not found`);
      manager.merge(User,user,updateUserDto);
      return manager.save(user);
    });
  }

  async remove(id: number) : Promise<void>  {
    return this.manager.transaction( async manager => {
      const user = await manager.findOne(User,id);
      if (!user) throw new NotFoundException(`User ${id} not found`);
      await manager.delete(User,id);
    });
  }
}
