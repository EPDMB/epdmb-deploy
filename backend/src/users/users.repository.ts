import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import {
  
  RegisterUserDto,
  RegisterUserFairDto,
  UpdatePasswordDto,
} from './users.dto';
import * as bcrypt from 'bcrypt';
import { Fair } from '../fairs/entities/fairs.entity';
import { UserFairRegistration } from '../fairs/entities/userFairRegistration.entity';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as QRCode from 'qrcode';
import { BuyerCapacity } from 'src/fairs/entities/buyersCapacity.entity';
import { FairDay } from 'src/fairs/entities/fairDay.entity';
import { Seller } from 'src/sellers/sellers.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Seller) private readonly sellerRepository: Repository<Seller>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Fair) private readonly fairRepository: Repository<Fair>,
    @InjectRepository(BuyerCapacity)
    private readonly buyerCapacityRepository: Repository<BuyerCapacity>,
    @InjectRepository(UserFairRegistration)
    private readonly userFairRegistrationRepository: Repository<UserFairRegistration>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
    @InjectRepository(FairDay)
    private readonly fairDayRepository: Repository<FairDay>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({
      relations: { seller: true },
    });
  }
  async findByDni(dni: string) {
    return await this.userRepository.findOneBy({ dni: dni });
  }
  async getUserByEmailAndDni() {
    const userInfo = await this.userRepository.find({select: ['email', 'dni'] });
    const sellerInfo = await this.sellerRepository.find({select: ['bank_account']});

    return {userInfo, sellerInfo}
  }

  async registerUserFair(
    fairId: string,
    userId: string,
    registerUser: RegisterUserFairDto,
  ) {
    const { selectedHour, selectedDay } = registerUser;

    const fair = await this.fairRepository.findOne({
      where: { id: fairId },
      relations: { fairDays: { buyerCapacities: true } },
    });
    if (!fair) throw new NotFoundException('Feria no encontrada');

    const user = await this.getUserById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const buyerCapacity = fair.fairDays
      .map((day) => day.buyerCapacities)
      .flat();
    console.log(buyerCapacity)

    const hourDay = buyerCapacity.find((hour) => hour.hour === selectedHour);

    if (hourDay.capacity <= 0) {
      throw new BadRequestException('No hay cupos disponibles en esta hora');
    }

    hourDay.capacity -= 1;
    await this.buyerCapacityRepository.save(hourDay);

    const userRegistration = new UserFairRegistration();
    userRegistration.registrationDate = new Date();
    userRegistration.entryFee = fair.entryPriceBuyer;
    userRegistration.registratonDay = selectedDay;
    userRegistration.registrationHour = selectedHour;
    userRegistration.user = user;
    userRegistration.fair = fair;

    await this.userFairRegistrationRepository.save(userRegistration);

    const token = this.jwtService.sign(
      { email: user.email },
      { secret: process.env.JWT_SECRET },
    );

    await this.sendEmailInscriptionFair(user.email, token, fair);
    return 'usuario registrado en la feria exitosamente, verifique su casilla';
  }

  async sendEmailInscriptionFair(email: string, token: string, fair: Fair) {
    const url = `${process.env.FRONTEND_URL}/fair/${token}`;
    const user = await this.findByEmail(email);
    const name = user.name;
    const DNI = user.dni;
    const fairName = fair.name;
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'L',
      scale: 1,
      width: 150,
    });

    const base64Data = qrCodeDataURL.replace(/^data:image\/png;base64,/, '');
    const qrCodeBuffer = Buffer.from(base64Data, 'base64');

    await this.mailService.sendMail({
      to: email,
      subject: 'Confirmación de inscripción a feria',
      template: 'mailFairVerification',
      context: { name, DNI, url, fairName },
      attachments: [
        {
          filename: 'qrcode.png',
          content: qrCodeBuffer,
          cid: 'qrCode',
        },
      ],
    });
    return qrCodeDataURL;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({where: {id:id}, relations: {seller:true} }  );
    if (!user) throw new NotFoundException('El usuario no existe');
    return user;
  }

  async updateUser(id: string, user: Partial<RegisterUserDto>) {
    const userFound = await this.getUserById(id);
    Object.assign(userFound, user);
    await this.userRepository.save(userFound);
  }

  async resetPassword(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async createUserAuth0(newUser: Partial<User>) {
    await this.userRepository.save(newUser);
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async registerUser(newUser: Partial<RegisterUserDto>): Promise<User> {
    return await this.userRepository.save(newUser);
  }

  async updateStatusUser(id: string) {
    const user = await this.getUserById(id);
    user.status = false;
    await this.userRepository.save(user);
  }

  async updatePassword(id: string, data: UpdatePasswordDto) {
    try {
      const user = await this.getUserById(id);
      const passwordValid = await bcrypt.compare(
        data.current_password,
        user.password,
      );
      if (!passwordValid)
        throw new BadRequestException('La  contraseña actual es incorrecta');
      const newPassIsDiferent = await bcrypt.compare(
        user.password,
        data.newPassword,
      );
      if (newPassIsDiferent)
        throw new BadRequestException(
          'La nueva contraseña no puede ser la misma que la anterior',
        );
      if (data.newPassword === data.confirmNewPassword) {
        user.password = await bcrypt.hash(data.newPassword, 12);
        await this.userRepository.save(user);
        return 'contraseña actualizada';
      } else {
        throw new BadRequestException('Las contraseñas no coinciden');
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
