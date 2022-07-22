import { RedisCollection } from '../../../Core/Models/RedisCollection'
import { CategoryTree } from '../Models/CategoryTree'
import { CategoryRepository } from '../Repositories/CategoryRepository'
import { CategoryTreeCacheRepository } from '../Repositories/CategoryTreeCacheRepository'

export class CategoryGetTreeService {
  private CACHE_NAME: string = 'categoryTreeCache'

  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryTreeCacheRepository: CategoryTreeCacheRepository
  ) {}

  public async execute(ignoreCache: boolean = false): Promise<CategoryTree[]> {
    const cache = await this.getCache()

    if (cache && !ignoreCache) return cache.getValue()

    const categoryTree = await this.getCategories()

    await this.createCache(categoryTree)

    return categoryTree
  }

  public async getCache() {
    try {
      return await this.categoryTreeCacheRepository.findOneById(this.CACHE_NAME)
    } catch (e) {
      return null
    }
  }

  public async createCache(categoryTree: CategoryTree[]) {
    return this.categoryTreeCacheRepository.save(
      new RedisCollection(this.CACHE_NAME, categoryTree, 60 * 30) // 30min
    )
  }

  public async getCategories(
    category: CategoryTree = null,
    categoriesTree: CategoryTree[] = []
  ): Promise<CategoryTree[]> {
    const categories = await this.categoryRepository.findAllByParentId(
      category?.getId() || null
    )

    for (let i = 0; i < categories.length; i++) {
      const categoryFound = categories[i]
      const categoryTree = new CategoryTree(
        categoryFound.getId(),
        categoryFound.getLabel(),
        categoryFound.getUrn()
      )

      if (!category) {
        categoriesTree.push(categoryTree)
      } else {
        category.getChildren().push(categoryTree)
      }

      await this.getCategories(categoryTree)
    }

    return categoriesTree
  }
}
