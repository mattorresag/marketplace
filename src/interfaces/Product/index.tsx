interface BaseProduct {
  id: number;
  identifier_code?: string;
  description?: string;
  conversion_factor?: number;
  image?: string;
  validated?: boolean;
  sub_category?: SubCategory;
  similars_list?: BaseProduct[];
  brand?: string;
}

interface Category {
  id: number;
  description: string;
}

interface SubCategory extends Category {
  category: Category;
}
