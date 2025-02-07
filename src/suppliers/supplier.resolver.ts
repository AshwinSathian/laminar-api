import { Supplier } from '@laminar-api/types';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SuppliersService } from './suppliers.service';

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Query(() => [Supplier])
  getSuppliers() {
    return this.suppliersService.findAll();
  }

  @Query(() => Supplier, { nullable: true })
  getSupplier(@Args('id') id: string) {
    return this.suppliersService.findOne(id);
  }

  @Mutation(() => Supplier)
  deleteSupplier(@Args('id') id: string) {
    return this.suppliersService.remove(id);
  }
}
