const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            nameTr: true,
            stock: true
        },
        take: 10
    });
    console.log(JSON.stringify(products, null, 2));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
