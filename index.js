const { PrismaClient } = require('@prisma/client')

const prisma = new  PrismaClient()

async function main(){
    const allSuppliers = await prisma.mst_supplier.findMany()
    console.log(allSuppliers)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })