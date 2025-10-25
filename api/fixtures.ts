import mongoose from 'mongoose';
import { config } from './config';
import { User } from './models/User';
import { randomUUID } from 'crypto';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;
  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collection were not created');
  }

  await User.create(
    {
      username: 'user',
      password: '123',
      displayName: 'user1 USERNAME',
      avatar: 'fixtures/userPic.png',
      token: randomUUID(),
    },
    {
      username: 'user2',
      password: '123',
      displayName: 'User2 USERNAME',
      avatar: 'fixtures/userPic.png',
      token: randomUUID(),
    },
    {
      username: 'admin',
      password: '123',
      displayName: 'Admin Username',
      avatar: 'fixtures/userPic.jpg',
      token: randomUUID(),
    },
  );

  await db.close();
};

run().catch((e) => console.error(e));
