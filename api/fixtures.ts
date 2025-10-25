import mongoose from 'mongoose';
import { config } from './config';
import { User } from './models/User';
import { randomUUID } from 'crypto';
import { Meal } from './models/Meal';
import { Comment } from './models/Comment';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;
  try {
    await db.dropCollection('users');
    await db.dropCollection('meals');
    await db.dropCollection('comments');
  } catch (e) {
    console.log('Collection were not created');
  }

  const [user, user2, user3] = await User.create(
    {
      username: 'user',
      password: '123',
      displayName: 'user1 USERNAME',
      avatar: 'fixtures/userPic.jpg',
      token: randomUUID(),
    },
    {
      username: 'user2',
      password: '123',
      displayName: 'User2 USERNAME',
      avatar: 'fixtures/userPic.jpg',
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

  const [meal, meal2, meal3] = await Meal.create(
    {
      title: 'lagma',
      user: user,
      recipe:
        'Laghman, leghmen, laghmen, lagman, or leghman is a dish of meat, vegetables and pulled noodles from Uyghur cuisine. In Chinese, the noodle is known as',
      image: 'fixtures/lagman.jpg',
    },
    {
      title: 'lagma2',
      user: user,
      recipe:
        'Laghman, leghmen, laghmen, lagman, or leghman is a dish of meat, vegetables and pulled noodles from Uyghur cuisine. In Chinese, the noodle is known as',
      image: 'fixtures/lagman.jpg',
    },
    {
      title: 'lagma3',
      user: user,
      recipe:
        'Laghman, leghmen, laghmen, lagman, or leghman is a dish of meat, vegetables and pulled noodles from Uyghur cuisine. In Chinese, the noodle is known as',
      image: 'fixtures/lagman.jpg',
    },
    {
      title: 'plov',
      user: user2,
      recipe:
        'Plov, the national dish of Uzbekistan is the ultimate social food. It brings people together, at life events-weddings and funerals-and official events',
      image: 'fixtures/plov.jpg',
    },
    {
      title: 'steak',
      user: user3,
      recipe:
        'A steak is a cut of meat sliced across muscle fibers, sometimes including a bone. It is normally grilled or fried, and can be diced or cooked in sauce.',
      image: 'fixtures/steak.webp',
    },
  );

  await Comment.create(
    {
      user: user,
      comment: 'Hello',
      meal: meal,
    },
    {
      user: user2,
      comment: 'cool',
      meal: meal,
    },
    {
      user: user3,
      comment: 'cool',
      meal: meal,
    },

    {
      user: user,
      comment: 'Yse',
      meal: meal2,
    },
    {
      user: user2,
      comment: 'Ma',
      meal: meal2,
    },
    {
      user: user3,
      comment: 'tasty',
      meal: meal2,
    },

    {
      user: user,
      comment: 'YUmmy',
      meal: meal3,
    },
    {
      user: user2,
      comment: 'no words',
      meal: meal2,
    },
    {
      user: user3,
      comment: 'Hell Yea',
      meal: meal3,
    },
  );

  await db.close();
};

run().catch((e) => console.error(e));
