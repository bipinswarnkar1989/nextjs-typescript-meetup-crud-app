import { NextApiHandler } from 'next';
import { MongoClient } from 'mongodb';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb://localhost:27017/nextjs-basics'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({
      message: 'Meetup Inserted',
    });
  }
};

export default handler;
