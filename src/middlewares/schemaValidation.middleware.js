import { ZodError } from 'zod';

export const schemaValidation = schema => (req, res, next) => {
  try {
    const data = req.dataRows;
    
    if (Array.isArray(data)) {
      // Si es un array, itera sobre cada elemento y valida
      data.forEach(item => {
        //schema.parse({ body: item });
        return console.log(schema.parse({ body: item }));
      });
    } else if (typeof data === 'object') {
      // Si es un objeto, simplemente valida
      schema.parse({ body: data });
    } else {
      throw new Error('Data no válida');
    }

    console.log('Success Validation');
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      //console.log('Error Validation:');
      return res.status(400).json({
        errors: error.issues.map(issue => ({
          path: issue.path,
          message: issue.message,
        })),
      });
    }
    return res.status(400).json({ message: 'internal error' });
  }
};
