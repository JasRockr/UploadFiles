import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  // res.send('Welcome to Api!');
  res.status(200).json({ message: 'Server Online ...' });
});

export default router;
