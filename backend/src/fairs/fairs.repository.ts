import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fair } from './entities/fairs.entity';
import { Repository } from 'typeorm';
import { FairDto } from './fairs.dto';
import { BuyerCapacity } from './entities/buyersCapacity.entity';
import { FairDay } from './entities/fairDay.entity';
import { Category } from '../categories/categories.entity';
import { FairCategory } from './entities/fairCategory.entity';
import { UserStatusGeneral } from '../users/users.enum';
import { SellerStatus } from '../sellers/sellers.enum';
import { addMinutes, parseISO } from 'date-fns';


@Injectable()
export class FairsRepository {
  constructor(
    @InjectRepository(Fair) 
    private readonly fairRepository: Repository<Fair>,
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
  
    const savedFair = await this.fairRepository.save(fair);
  
    if (fairDto.fairCategories) {
      const fairCategories = await Promise.all(
        fairDto.fairCategories.map(async (fairCategoryDto) => {
          const fairCategory = new FairCategory();
          fairCategory.maxProductsSeller = fairCategoryDto.maxProductsSeller;
          fairCategory.minProductsSeller = fairCategoryDto.minProductsSeller;
          fairCategory.maxSellers = fairCategoryDto.maxSellers;
          fairCategory.maxProducts = fairCategoryDto.maxProducts;
          fairCategory.fair = savedFair;
          fairCategory.products = [];
  
          if (fairCategoryDto.category && Array.isArray(fairCategoryDto.category) && fairCategoryDto.category.length > 0) {
            const categoryEntities = await Promise.all(
              fairCategoryDto.category.map(async (categoryDto) => {
                const category = await this.categoryRepository.findOneBy({ name: categoryDto.name });
                if (!category) {
                  throw new NotFoundException(`La categoría ${categoryDto.name} no existe`);
                }
                return category;
              })
            );
            fairCategory.category = categoryEntities[0];
          } else {
            throw new BadRequestException('La categoría no tiene nombre o no está definida correctamente');
          }
  
          return this.fairCategoryRepository.save(fairCategory);
        })
      );
      savedFair.fairCategories = fairCategories;
    }
  
    const startDate = new Date(fairDto.startDate);
    const endDate = new Date(fairDto.endDate);
    const startTime = parseISO(`1970-01-01T${fairDto.startTime}:00Z`);
    const endTime = parseISO(`1970-01-01T${fairDto.endTime}:00Z`);
    const interval = fairDto.timeSlotInterval;
  
    const fairDays = [];
    for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
      const fairDay = new FairDay();
      fairDay.day = new Date(day);
      fairDay.fair = savedFair;
  
      const savedFairDay = await this.fairDayRepository.save(fairDay);
  
      const buyerCapacities = [];
      for (let time = startTime; time < endTime; time = addMinutes(time, interval)) {
        const buyerCapacity = new BuyerCapacity();
        buyerCapacity.hour = time.toISOString().substr(11, 5); 
        buyerCapacity.capacity = fairDto.capacityPerTimeSlot;
        buyerCapacity.fairDay = savedFairDay;
        buyerCapacities.push(await this.buyerCapacityRepository.save(buyerCapacity));
      }
      savedFairDay.buyerCapacities = buyerCapacities;
      fairDays.push(savedFairDay);
    }
  
    savedFair.fairDays = fairDays;
    return savedFair;
  }

  async getAllFairs(): Promise<Fair[]> {
    return await this.fairRepository.find({
      relations: [
        'fairDays',
        'fairDays.buyerCapacities',
        'userRegistrations',
        'sellerRegistrations',
        'sellerRegistrations.categoryFair.category',
        'sellerRegistrations.seller',
        'fairCategories',
        'fairCategories.category',
        'fairCategories.products',
        'sellerRegistrations.seller.user',
      ],
    });
  }

  async updateFair(fair: Partial<FairDto>, fairId: string) {
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
      relations: [
        'fairDays',
        'fairDays.buyerCapacities',
        'userRegistrations',
        'sellerRegistrations',
        'sellerRegistrations.categoryFair.category',
        'sellerRegistrations.seller',
        'fairCategories',
        'fairCategories.products',
        'fairCategories.category',
        'sellerRegistrations.seller.user',
        'productRequests'
      ],
    });
    if (!fair) throw new NotFoundException('Feria no encontrada');
    return fair;
  }

  async saveFair(fair) {
    return await this.fairRepository.save(fair);
  }

  async closeFair(fairId: string) {
    const fairToClose = await this.fairRepository.findOneBy({ id: fairId });
    if (!fairToClose) throw new NotFoundException('Feria no encontrada');
    //ACA VAN LAS OPERACIONES DE CERRAR LA FERIA

    // Usuario inactive (no participa en feria)
    //USUARIO PASE DE ACTIVE A INACTIVE
    const user = fairToClose.userRegistrations;
    user.map((user) => {
      user.user.statusGeneral = UserStatusGeneral.INACTIVE;
    })

    //Seller NO_ACTIVE (no participa en feria)
    //SELLER PASE DE ACTIVE A NO_ACTIVE
    const seller = fairToClose.sellerRegistrations;
    seller.map((seller) => {
      seller.seller.status = SellerStatus.NO_ACTIVE;
    })

    //DESACTIVAR LA FERIA 
    fairToClose.isActive = false;
    return await this.fairRepository.save(fairToClose);
  }
}
