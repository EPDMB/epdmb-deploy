import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CategoryDto } from "./categories.dto";
import { CategoriesService } from "./categories.service";
import { Roles } from "../users/roles/roles.decorator";
import { Role } from "../users/roles/roles.enum";
import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../users/roles/roles.guard";
import { createCategorySwagger, getCategoriesSwagger, getCategoryByIdSwagger } from "./categories.swagger";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @createCategorySwagger()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    async createCategory(@Body() category: CategoryDto) {
        return await this.categoriesService.createCategory(category);
    }
   
    @getCategoriesSwagger()
    @UseGuards(AuthGuard)
    @Get()
    async getAllCategories() {
        return await this.categoriesService.getAllCategories();
    }

    @getCategoryByIdSwagger()
    @UseGuards(AuthGuard)
    @Get(':id')
    async getCategoryById(@Param('id') id: string) {
        return await this.categoriesService.getCategoryById(id);
    }
}