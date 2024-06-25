import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtservice: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.autorization?.split(' ')[1];
    const bearer = request.headers.autorization?.split(' ')[0];

    if (!bearer) throw new NotFoundException('no es bearer');
    if (!token) throw new NotFoundException('Token inexistente');

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtservice.verify(token, { secret });
      request.user = payload;
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
