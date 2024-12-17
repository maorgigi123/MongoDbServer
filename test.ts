// this code its just for first insert to the db 


// app.get('/images', async (req: Request, res: Response) => {
//     const { category = 'sport', page = '1' } = req.query as { category?: string; page?: string };
//     console.log('Category:', category, 'Page:', page); // Log incoming params
  
//     try {
//       // Ensure page is an integer
//       const pageNumber = parseInt(page, 10) || 1;
  
//       // Fetch data from the Pixabay API
//       const response = await axios.get<any>('https://pixabay.com/api/', {
//         params: {
//           key: '25540812-faf2b76d586c1787d2dd02736',
//           q: category,
//           page: pageNumber,
//           per_page: 9,
//           image_type: 'photo',
//         },
//       });
  
//       // Create a new DataByCategories document to store the current page's hits
//       const dataByCategory = new DataByCategories({
//         Data: response.data.hits, // Store the hits in the Data field
//       });
  
//       // Save the DataByCategories document to the database
//       const savedData = await dataByCategory.save();
//       const savedDataId = savedData._id as mongoose.Types.ObjectId; // Type assertion
  
//       // Find the category in Categories and update its pages field with the current page's hits reference
//       const categoryDoc = await Categories.findOne({ 'categories.category': category });
  
//       if (!categoryDoc) {
//         // If the category doesn't exist, create a new category entry
//         const newCategory = new Categories({
//           categories: [
//             {
//               category,
//               pages: [savedDataId], // Add the page reference to the new category
//             },
//           ],
//         });
//         await newCategory.save();
//       } else {
//         // If the category exists, update it by adding the current page's hits reference
//         const categoryIndex = categoryDoc.categories.findIndex(
//           (cat) => cat.category === category
//         );
  
//         if (categoryIndex === -1) {
//           categoryDoc.categories.push({
//             category,
//             pages: [savedDataId], // Add the page reference to the category
//           });
//         } else {
//           categoryDoc.categories[categoryIndex].pages.push(savedDataId);
//         }
  
//         await categoryDoc.save();
//       }
  
//       // Send response back with the hits and total data
//       res.json({
//         hits: response.data.hits,
//         total: response.data.total,
//       });
//     } catch (error) {
//       console.error('Error fetching images:', error);
//       res.status(500).json({ error: 'Failed to fetch images' });
//     }
//   });