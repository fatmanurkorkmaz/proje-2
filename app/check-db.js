const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.findMany();
    console.log('--- PRODUCTS ---');
    console.log(JSON.stringify(products, null, 2));

    const users = await prisma.user.findMany();
    console.log('--- USERS ---');
    console.log(JSON.stringify(users, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
