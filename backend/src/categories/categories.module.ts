import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { CategoriesController } from "./categories.controller";
import { CategoriesRepository } from "./categories.repository";
import { CategoriesService } from "./categories.service";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoriesController],
    providers: [CategoriesRepository, CategoriesService],
    exports: []
})

export class CategoriesModule implements OnModuleInit { 
    private categories: string[] = ["0-12 Varon", "0-12 Mujer", "+12 Varon", "+12 Mujer", "Adultos", "Libros/Juguetes"]
    constructor(
        private readonly categoriesService: CategoriesService
    ) {}
    onModuleInit() {
        for(let i = 0; i < this.categories.length; i++) {
            this.categoriesService.createCategory({name: this.categories[i]})
    }
}
}