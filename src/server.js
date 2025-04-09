import express from 'express';
import cors from 'cors';

import {bookRoutes, authorRoutes, genreRoutes, userRoutes, orderRoutes} from './routes/index.js';
import {errorHandler} from './middleware/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});