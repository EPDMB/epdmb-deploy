import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../sellers/sellers.entity';
import { UserRepository } from '../users/users.repository';
import { RegisterSellerDto } from './sellers.dto.js';
import { Role } from '../roles/roles.enum';
import { User } from '../users/users.entity';

@Injectable()
export class SellerRepository {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    private readonly userRepository: UserRepository,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async sellerRegister(
    sellerData: RegisterSellerDto,
  ): Promise<Partial<Seller>> {
    const {
      name,
      lastname,
      email,
      confirmPassword,
      password,
      dni,
      phone,
      address,
      profile_picture,
    } = sellerData;

    const sellerX = this.sellerRepository.create();
    sellerX.bank_account = sellerData.bank_account;
    sellerX.social_media = sellerData.social_media;
    await this.sellerRepository.save(sellerX);

    const userRegistered = await this.userRepository.registerUser({
      name,
      lastname,
      email,
      confirmPassword,
      password,
      dni,
      phone,
      address,
      profile_picture,
      role: Role.SELLER,
    });
    userRegistered.seller = sellerX;
    await this.usersRepository.save(userRegistered);
    return sellerX;
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
