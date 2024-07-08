import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fair } from './entities/fairs.entity';
import { Repository } from 'typeorm';
import { FairDto } from './fairs.dto';
import { BuyerCapacity } from './entities/buyersCapacity.entity';
import { FairDay } from './entities/fairDay.entity';
import { Category } from 'src/categories/categories.entity';
import { FairCategory } from './entities/fairCategory.entity';

@Injectable()
export class FairsRepository {
  constructor(
    @InjectRepository(Fair) private readonly fairRepository: Repository<Fair>,
    @InjectRepository(BuyerCapacity)
    private readonly buyerCapacityRepository: Repository<BuyerCapacity>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(FairDay)
    private readonly fairDayRepository: Repository<FairDay>,
    @InjectRepository(FairCategory)
    private readonly fairCategoryRepository: Repository<FairCategory>,
  ) {}

  async createFair(fairDto: FairDto): Promise<Fair> {
    const fair = new Fair();
    fair.name = fairDto.name;
    fair.address = fairDto.address;
    fair.entryPriceSeller = fairDto.entryPriceSeller;
    fair.entryPriceBuyer = fairDto.entryPriceBuyer;
    fair.entryDescription = fairDto.entryDescription;

    // Guardar la instancia de Fair primero
    const savedFair = await this.fairRepository.save(fair);

    if (fairDto.fairCategories) {
      const fairCategories = await Promise.all(
        fairDto.fairCategories.map(async (fairCategoryDto) => {
          const fairCategory = new FairCategory();
          fairCategory.maxProductsSeller = fairCategoryDto.maxProductsSeller;
          fairCategory.minProductsSeller = fairCategoryDto.minProductsSeller;
          fairCategory.maxSellers = fairCategoryDto.maxSellers;
          fairCategory.fair = savedFair; // Asignar la referencia a Fair

          if (fairCategoryDto.category) {
            let categoryEntities;
            if (Array.isArray(fairCategoryDto.category)) {
              categoryEntities = fairCategoryDto.category.map((categoryDto) => {
                const category = new Category();
                category.name = categoryDto.name;
                category.products = []; // Asignar una lista vacía de productos
                return category;
              });
            } else {
              const category = new Category();
              category.name = fairCategoryDto.category.name;
              category.products = []; // Asignar una lista vacía de productos
              categoryEntities = [category];
            }
            const savedCategories =
              await this.categoryRepository.save(categoryEntities);
            fairCategory.category = Array.isArray(savedCategories)
              ? savedCategories[0]
              : savedCategories;
          }

          return this.fairCategoryRepository.save(fairCategory);
        }),
      );
      savedFair.fairCategories = fairCategories;
    }

    if (fairDto.fairDays) {
      const fairDays = await Promise.all(
        fairDto.fairDays.map(async (fairDayDto) => {
          const fairDay = new FairDay();
          fairDay.day = fairDayDto.day;
          fairDay.fair = savedFair;

          const savedFairDay = await this.fairDayRepository.save(fairDay);

          if (fairDayDto.buyerCapacities) {
            const buyerCapacities = await Promise.all(
              fairDayDto.buyerCapacities.map(async (buyerCapacityDto) => {
                const buyerCapacity = new BuyerCapacity();
                buyerCapacity.hour = buyerCapacityDto.hour;
                buyerCapacity.capacity = buyerCapacityDto.capacity;
                buyerCapacity.fairDay = savedFairDay;
                return this.buyerCapacityRepository.save(buyerCapacity);
              }),
            );
            savedFairDay.buyerCapacities = buyerCapacities;
          }

          return savedFairDay;
        }),
      );

      savedFair.fairDays = fairDays;
    }

    return savedFair;
  }

  async getAllFairs() {
    return await this.fairRepository.find({
      relations: [
        'fairCategories',
        'fairCategories.category',
        'fairDays',
        'fairDays.buyerCapacities',
      ],
    });
  }

  async updateFair(fair: FairDto, fairId: string) {
    const fairToUpdate = await this.fairRepository.findOneBy({ id: fairId });
    if (!fairToUpdate) throw new NotFoundException('Feria no encontrada');

    Object.assign(fairToUpdate, fair);
    await this.fairRepository.save(fairToUpdate);
    return { message: 'Feria actualizada correctamente', fairToUpdate };
  }

  async deleteFair(fairId: string) {
    const fairToDelete = await this.fairRepository.findOneBy({ id: fairId });
    if (!fairToDelete) throw new NotFoundException('Feria no encontrada');
    await this.fairRepository.remove(fairToDelete);
    return { message: 'Feria eliminada correctamente', fairToDelete };
  }

  async getFairById(fairId: string) {
    const fair = await this.fairRepository.findOne({
      where: { id: fairId },
    });
    if (!fair) throw new NotFoundException('Feria no encontrada');
    return fair;
  }

  async saveFair(fair) {
    return await this.fairRepository.save(fair);
  }

  async closeFair(fairId: string) {
    const fairToUpdate = await this.fairRepository.findOneBy({ id: fairId });
    if (!fairToUpdate) throw new NotFoundException('Feria no encontrada');
    //ACA VAN LAS OPERACIONES DE CERRAR LA FERIA
  }
}
