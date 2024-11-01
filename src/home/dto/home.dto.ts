import { propertyType } from "@prisma/client";
import {Exclude,Expose, Type} from "class-transformer"
import { IsAlpha, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPort, IsPositive, IsSemVer, IsString, ValidateNested } from "class-validator";

export class HomeResponseDto {
    id: number;
    address: string;

    @Exclude()
    number_of_bedrooms: number;

    @Expose({name: "numberOfBedrooms"})
    numberOfBedrooms(){
        return this.number_of_bathrooms;
    }

    @Exclude()
    number_of_bathrooms: number;

    @Expose({name:"numberOfBathrooms"})
    numberOfBathrooms(){
        return this.number_of_bathrooms
    }

    city: String;

    @Exclude()
    listed_at: Date;


    @Expose({name:"listedDate"})
    listedDate(){
        return this.listedDate;
    }

    price: number;

    image: string;

    @Exclude()
    land_size: number;


    @Expose({name:"landSize"})
    landSize(){
        return this.landSize;
    }

    propertyType: propertyType;

    @Exclude()
    created_at: Date;
    @Exclude()
    updated_at: Date;
    @Exclude()
    relator_id: number;

    constructor(partial:Partial<HomeResponseDto>){
        Object.assign(this, partial);
    }
}

class Image{
    @IsString()
    @IsNotEmpty()
    url: string;
}

export class CreateHomeDto {
    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    @IsPositive()
    numberOfBedrooms: number;

    @IsNumber()
    @IsPositive()
    numberOfBathrooms: number;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsPositive()
    price: number;

    @IsString()
    @IsPositive()
    landSize: number;

    @IsEnum(propertyType)
    propertyType: propertyType;

    @IsArray()
    @ValidateNested({each:true})
    @Type(() => Image)
    images: Image[]
}

export class UpdateHomeDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    address?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    numberOfBedrooms?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    numberOfBathrooms?: number;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsOptional()
    @IsString()
    @IsPositive()
    price?: number;

    @IsOptional()
    @IsString()
    @IsPositive()
    landSize?: number;

    @IsOptional()
    @IsEnum(propertyType)
    propertyType?: propertyType;
}