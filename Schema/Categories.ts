import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory {
  category: string;
  pages: mongoose.Types.ObjectId[];
}

export interface ICategories extends Document {
  categories: ICategory[];
}

const CategoriesSchema = new Schema<ICategories>({
  categories: [
    {
      category: {
        type: String,
        required: true,
      },
      pages: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'DataByCategories',
        },
      ],
    },
  ],
});

const Categories = mongoose.model<ICategories>('Categories', CategoriesSchema);
export default Categories;
