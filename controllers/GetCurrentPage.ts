import { Request, Response } from 'express';
const GetCurrentPage = (Categories: any, DataByCategories: any) => {
  return async (req: Request, res: Response) => {
    const { category, page } = req.query;
    try {
      // Find the category in the Categories collection
      const categoryData = await Categories.findOne({ 'categories.category': category }).exec();

      if (!categoryData) {
        return res.status(404).json({ error: 'Category not found' });
      }

      // Find the page from the category's pages
      const categoryObj = categoryData.categories.find((cat: { category: string }) => cat.category === category); 

      if (!categoryObj) {
        return res.status(404).json({ error: 'Category data not found' });
      }

      // Get the ObjectId for the current page
      const pageId = categoryObj.pages[Number(page) - 1]; // assuming `page` is 1-based

      if (!pageId) {
        return res.status(404).json({ error: 'Page not found' });
      }

      // Fetch the data for the specific page from the DataByCategories collection
      const pageData = await DataByCategories.findById(pageId).exec();

      if (!pageData) {
        return res.status(404).json({ error: 'No data found for the page' });
      }

      // Send the data back to the client
      res.json(pageData.Data);
    } catch (e) {
      console.error('Error fetching image data:', e);
      res.status(500).json({ error: 'Error fetching data' });
    }
  };
};

export default GetCurrentPage;
