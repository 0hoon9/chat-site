//MongoDB와 연결된 js파일
import dotenv from 'dotenv';
import users from '../data/users';
import User from '../models/userModel';
import connectDB from '../config/db';

connectDB();

// Data import to MongoDB
const importData = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('데이터가 추가되었습니다.');
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// Data delete in MongoDB
const destroyData = async () => {
  try {
    await User.deleteMany({});
    console.log('데이터가 삭제되었습니다.');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
