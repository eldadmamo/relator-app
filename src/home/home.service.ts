import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto';
import { propertyType } from '@prisma/client';

interface GetHomesParam {
    city?: string;
    price?: {
      gte?: number;
      lte?: number;
    };
    propertyType?: propertyType;
  }
  
  interface CreateHomeParams {
    address: string;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    city: string;
    price: number;
    landSize: number;
    propertyType: propertyType;
    images: { url: string }[];
  }
  
  interface UpdateHomeParams {
    address?: string;
    numberOfBedrooms?: number;
    numberOfBathrooms?: number;
    city?: string;
    price?: number;
    landSize?: number;
    propertyType?: propertyType;
  }
  
  export const homeSelect = {
    id: true,
    address: true,
    city: true,
    price: true,
    propertyType: true,
    number_of_bathrooms: true,
    number_of_bedrooms: true,
  };

@Injectable()
export class HomeService { 

    constructor(private readonly prismaService: PrismaService){}

    async getHomes(
    filter : GetHomesParam
    ) : Promise<HomeResponseDto[]> {
        const homes = await this.prismaService.home.findMany({

            select:{
                id: true,
                address:true,
                city: true,
                price: true,
                propertyType: true,
                number_of_bathrooms: true,
                number_of_bedrooms:true,
                images:{
                    select:{
                        url: true
                    },
                    take:1
                }
            },
            where: filter,
        })

        if(!homes.length){
            throw new NotFoundException()
        }

        return homes.map(
            (home) => {
               const fetchHome = {...home, image: home.images[0].url}
               delete fetchHome.images
               return new HomeResponseDto(fetchHome)
               }
            ) 
        }

        async getHomeById(id: number) {
            const home = await this.prismaService.home.findUnique({
              where: {
                id,
              },            
            });
        
            if (!home) {
              throw new NotFoundException();
            }
        
            return new HomeResponseDto(home);
          }

          async createHome({ 
            address,
            numberOfBathrooms,
            numberOfBedrooms,
            city,
            landSize,
            price,
            propertyType,
            images
    }: CreateHomeParams){
            const home = await this.prismaService.home.create({
                data:{
                address,
                number_of_bathrooms: numberOfBathrooms,
                number_of_bedrooms: numberOfBedrooms,
                city,
                land_size: landSize,
                propertyType,
                price,
                relator_id: 4,
                }
            })
            const homeImages = images.map((image) => {
                return {...image, home_id: home.id}
            })

            await this.prismaService.image.createMany({data: homeImages})

            return new HomeResponseDto(home);
          }

          async updateHomeById(id: number, data: UpdateHomeParams){
            const home = await this.prismaService.home.findUnique({
                where:{
                    id
                }
            })

            if(!home){
                throw new NotFoundException();
            }

            const updatedHome = await this.prismaService.home.update({
                where:{
                    id
                },
                data
            })

            return new HomeResponseDto(updatedHome)
          }

          async deleteHomeById(id:number){
            await this.prismaService.image.deleteMany({
                where:{
                    home_id: id,
                }
            });
            await this.prismaService.home.delete({
                where:{
                    id,
                }
            })
          }
    }
