const prisma = require('../helpers/database')

class _supplier {
    listSup = async () => {
        try {
            const list = await prisma.mst_supplier.findMany()

            return{
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listSup supplier module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _supplier()