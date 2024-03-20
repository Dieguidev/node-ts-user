import { CategoryModel } from '../../data';
import { CustomError, PaginationDto, UserEntity } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-categroy.dto';




export class CategoryService {
  constructor() { }

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });
    if (categoryExists) throw CustomError.badRequest('Category already exists')

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  async getAllCategories(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;


    try {


      // const total = await CategoryModel.countDocuments();
      // const categories = await CategoryModel.find()
      //   .skip(skip)
      //   .limit(limit);

      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip(skip)
          .limit(limit)
      ])

      const listCategories = categories.map(category => ({
        id: category.id,
        name: category.name,
        available: category.available,
      })
      )

      return {
        page,
        limit,
        total: total,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        prev: (page - 1 > 0) ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
        categories: listCategories
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
