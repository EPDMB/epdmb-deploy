import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { FileService } from './files.service';
import { UsersService } from '../users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly userService: UsersService,
  ) {}

  @Post('uploadImage/:id')
  @ApiConsumes('multipart/form-data')
  //@UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Upload image',
    description:
      'Recibe por el body en formato file el archivo a subir y retorna el producto con la url de la imagen',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: 'string',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 50000000,
            message: 'El tamaño máximo es de 200KB',
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
