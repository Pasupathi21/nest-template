import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsBoolean, IsArray, IsNumber, IsOptional } from 'class-validator'

export class CreateTemplateDto { }
export class InsertUser {

    @ApiProperty()
    @IsString()
    user_name: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    is_active: boolean = true
}

export class InsertMovies {

    @ApiProperty()
    @IsString()
    movie_name: string

    @ApiProperty()
    @IsString()
    genre_id: string

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    is_active: boolean = true
}

export class InsertGenre {
    @ApiProperty()
    @IsString()
    genre: string

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    is_active: boolean = true
}

export class InsertReview {
    @ApiProperty()
    @IsString()
    review: string

    @ApiProperty()
    @IsString()
    movie_id: string

    @ApiProperty()
    @IsString()
    user_id: string

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    is_active: boolean = true
}

export class InsertRating {
    @ApiProperty()
    @IsNumber()
    rating: number = 0

    @ApiProperty()
    @IsString()
    user_id: string

    @ApiProperty()
    @IsString()
    movie_id: string

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    is_active: boolean = true
}

export type InsertPayload = {
    user: InsertUser;
    movie: InsertMovies;
    genre: InsertGenre;
    review: InsertReview;
    rating: InsertRating;
}
