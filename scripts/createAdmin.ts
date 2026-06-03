import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'calmaplus-seed@localhost';
  const password = process.env.ADMIN_PASS || 'seeded-password';
  const name = process.env.ADMIN_NAME || 'Seed Admin';

  const hashed = await bcrypt.hash(password, 10);

  let user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed, role: 'admin', name } });
    console.log(`Admin updated: ${email}`);
  } else {
    user = await prisma.user.create({ data: { name, email, password: hashed, role: 'admin' } });
    console.log(`Admin created: ${email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
