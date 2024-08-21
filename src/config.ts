import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    mysql: {
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      name: process.env.MYSQL_DATABASE_NAME,
    },
    typeorm: {
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      user: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      name: process.env.TYPEORM_DATABASE,
    },
  };
});
