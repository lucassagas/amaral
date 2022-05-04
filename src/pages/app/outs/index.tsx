import { PageWrapper } from '@/components/PageWrapper'
import { Pagination } from '@/components/Pagination'
import { Scroll } from '@/components/Scroll'
import { OutsTable } from '@/components/Tables/OutTable'
import { prisma } from '@/lib/prisma'
import { EntriesProps } from '@/services/hooks/useEntries'
import { useOuts } from '@/services/hooks/useOuts'
import { formatDate } from '@/utils/formatDate'
import { Flex, Spinner, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { AuthenticatedLayout } from 'src/layouts/AuthenticatedLayout'

type InitialOutsProps = {
  initialOuts?: {
    outs: EntriesProps[]
    totalOuts: number
  }
}

export default function Outs({ initialOuts }: InitialOutsProps) {
  const [page, setPage] = useState(1)
  const { data, refetch, error, isLoading, isFetching } = useOuts(page, {
    initialData: initialOuts,
  })

  return (
    <PageWrapper
      refetch={() => refetch()}
      isFetching={isFetching}
      isLoading={isLoading}
      registrationRoute="outs/create"
      title="Saídas"
    >
      <Head>
        <title>Maral | Saídas</title>
      </Head>

      {isLoading && (
        <Flex justify="center">
          <Spinner />
        </Flex>
      )}

      {error && !isLoading && (
        <Flex justify="center">
          <Text>Falha ao obter dados das saídas.</Text>
        </Flex>
      )}

      {data?.outs?.length && (
        <Scroll>
          <OutsTable outs={data?.outs} />

          <Pagination
            registersPerPage={10}
            onPageChange={setPage}
            totalCountOfRegisters={data.totalOuts}
            currentPage={page}
          />
        </Scroll>
      )}
    </PageWrapper>
  )
}

Outs.layout = AuthenticatedLayout

export const getServerSideProps: GetServerSideProps = async () => {
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
  })
  const totalOuts = await prisma.entries.count()

  const formatedOuts = outs.map((out) => ({
    ...out,
    updatedAt: formatDate(out.updatedAt),
  }))

  const initialOuts = {
    totalOuts,
    outs: formatedOuts,
  }

  return {
    props: {
      initialOuts,
    },
  }
}
