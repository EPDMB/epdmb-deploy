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
    private categories = [{name: "0-12-Varon", maxSellers: 10},{name: "0-12-Mujer", maxSellers: 10}, {name: "+12-Varon", maxSellers: 10}, {name: "+12-Mujer", maxSellers: 10}, {name: "Adultos", maxSellers: 10}, {name: "Libros/Juguetes", maxSellers: 10}]
    constructor(
        private readonly categoriesService: CategoriesService
    ) {}
    onModuleInit() {
        for(let i = 0; i < this.categories.length; i++) {
            this.categoriesService.createCategory(this.categories[i])
    }
}
}