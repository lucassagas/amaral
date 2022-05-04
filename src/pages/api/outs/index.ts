import { prisma } from '@/lib/prisma'
import { validationToken } from '@/utils/validationToken'
import { NextApiRequest, NextApiResponse } from 'next'
async function outs(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, per_page = 10 } = req.body

  const outs = await prisma.outs.findMany({
    select: {
      id: true,
      oldQuantity: true,
      newQuantity: true,
      quantity: true,
      updatedAt: true,
      product: {
        select: {
          name: true,
        },
      },
      createdBy: {
        select: {
          name: true,
        },
      },
    },
    skip: (Number(page) - 1) * 10,
    take: Number(per_page),
  })

  const totalOuts = await prisma.outs.count()

  return res.status(200).json({ outs, totalOuts })
}

export default validationToken(outs)
