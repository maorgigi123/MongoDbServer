import mongoose, { Document, Schema } from 'mongoose';

export interface IDataByCategories extends Document {
  Data: object[];
}

const DataByCategoriesSchema = new Schema<IDataByCategories>({
  Data: [
    {
      type: Object,
    },
  ],
});

const DataByCategories = mongoose.model<IDataByCategories>('DataByCategories', DataByCategoriesSchema);
export default DataByCategories;
