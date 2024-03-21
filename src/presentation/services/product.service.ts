import { CategoryModel, ProductModel } from '../../data';
import { CreateProductDto, CustomError, PaginationDto } from '../../domain';





export class ProductService {
  constructor() { }

  async createProduct(createProductDto: CreateProductDto) {
    const prodyctExists = await ProductModel.findOne({ name: createProductDto.name });
    if (prodyctExists) throw CustomError.badRequest('Product already exists')

    try {
      const product = new ProductModel(createProductDto);

      await product.save();

      return product

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  async getAllProducts(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;


    try {

      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip(skip)
          .limit(limit)
        //todo: populate
      ])


      return {
        page,
        limit,
        total,
        next: (total - (page * limit)) > 0 ? `/api/products?page=${page + 1}&limit=${limit}` : null,
        prev: (page - 1 > 0) ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
