import { BomsService } from './boms.service';
import { CreateBomDto } from './dto/create-bom.dto';
import { UpdateBomDto } from './dto/update-bom.dto';
export declare class BomsController {
    private readonly bomsService;
    constructor(bomsService: BomsService);
    create(createBomDto: CreateBomDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBomDto: UpdateBomDto): string;
    remove(id: string): string;
}
