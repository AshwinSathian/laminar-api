import { CreateBomDto } from './dto/create-bom.dto';
import { UpdateBomDto } from './dto/update-bom.dto';
export declare class BomsService {
    create(createBomDto: CreateBomDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBomDto: UpdateBomDto): string;
    remove(id: number): string;
}
