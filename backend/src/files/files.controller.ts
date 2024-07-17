import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './files.service';
import { UsersService } from '../users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { updateImageSwagger } from './files.swagger';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/users/roles/roles.enum';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly userService: UsersService,
  ) {}

  @updateImageSwagger()
  @UseGuards(AuthGuard)
  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2097152 ,
            message: 'El tamaño máximo es de 2MB',
          }),
          new FileTypeValidator({
            fileType: /.(jpg|jpeg|png|webp|gif)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.userService.getUserById(id);
    const image = await this.fileService.uploadImage(file);
    return await this.userService.updateUser(id, {
      profile_picture: image.secure_url,
    });
  }
}
