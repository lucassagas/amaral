import { OutsProps } from '@/services/hooks/useOuts'
import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'

type OutsTableProps = {
  outs?: OutsProps[]
}

export function OutsTable({ outs }: OutsTableProps) {
  return (
    <Table colorScheme="whiteAlpha" mb="4">
      <Thead>
        <Tr>
          <Th>Produto</Th>
          <Th>Qtd. anterior</Th>
          <Th>Saída</Th>
          <Th>Estoque</Th>
          <Th>Responsável</Th>
          <Th>Data</Th>
        </Tr>
      </Thead>
      <Tbody>
        {outs?.map((out) => (
          <Tr key={out.id}>
            <Td>
              <Text>{out.product.name}</Text>
            </Td>
            <Td>
              <Text>{out.oldQuantity}</Text>
            </Td>
            <Td>
              <Text>{out.quantity}</Text>
            </Td>
            <Td>
              <Text>{out.newQuantity}</Text>
            </Td>
            <Td>
              <Text>{out.createdBy.name}</Text>
            </Td>
            <Td>
              <Text>{out?.updatedAt}</Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
