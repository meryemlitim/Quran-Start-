import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { Role } from '../common/enums/role.enum';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: RegisterDto): Promise<UserDocument> {
  const exists = await this.userModel.findOne({ email: dto.email });
  if (exists) throw new ConflictException('Email already in use');

  const hashed = await bcrypt.hash(dto.password, 10);
  const user = new this.userModel({
    parentName: dto.parentName,
    email: dto.email,
    password: hashed,
    phoneNumber: dto.phoneNumber,
    childName: dto.childName,
    childAge: dto.childAge,
    role: Role.PARENT,
  });
  return user.save();
}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async getAllUsers(): Promise<UserDocument[]>  {
    const user = await this.userModel.find().select('-password');
    return user;
  }
}