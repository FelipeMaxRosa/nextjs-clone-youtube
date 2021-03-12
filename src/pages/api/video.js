import { ObjectId } from 'mongodb';
import nc from 'next-connect';
import { connectToDatabase } from '../../utils/mongodb';
import upload from '../../utils/upload';
import jwt from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

const handler = nc()
  .use(upload.single('file'))
  .post(async (req, res) => {
    // receber nossa imagem e outros dados pelo endpoint
    // inserir no banco de dados MONGODB
    const { title, authorId, authorName, authorAvatar, videoUrl } = req.body;

    const token = await jwt.getToken({ req, secret });

    // 29minutos Aula 09

    if (token) {
      const { db, client } = await connectToDatabase();
      
      if (client.isConnected()) {
        const collection = db.collection('videos');
        const newPost = await collection.insertOne({
          title,
          authorId: ObjectId(authorId),
          authorName,
          authorAvatar,
          views: 0,
          thumb: req.file.location,
          videoUrl,
          updatedAt: new Date()
        });
    
        res.status(200).json({ ok: true, newPost: newPost.ops });
      } else {
        res.status(500).json({ error: 'client DB is not connected' });
      }
    }

    return res.status(401).end();

  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;