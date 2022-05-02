import { AppProvider } from '@/contexts/index'
import { render } from '@testing-library/react'
import { EntriesTable } from './EntriesTable'

const mockedEntries = [
  {
    createdBy: {
      name: 'Lucas Sagás',
    },
    id: '03090998-a61b-4039-a0bb-565a9d90744b',
    newQuantity: 250,
    oldQuantity: 150,
    product: {
      name: 'peixe',
    },
    quantity: 100,
    updatedAt: '04/04/2022',
  },
]

const renderComponent = () => {
  return render(
    <AppProvider>
      <EntriesTable entries={mockedEntries} />
    </AppProvider>
  )
}

describe('<EntriesTable />', () => {
  it('should render correctly', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })
})
