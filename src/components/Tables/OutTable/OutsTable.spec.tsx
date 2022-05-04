import { AppProvider } from '@/contexts/index'
import { render } from '@testing-library/react'
import { OutsTable } from './OutsTable'

const mockedOuts = [
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
      <OutsTable outs={mockedOuts} />
    </AppProvider>
  )
}

describe('<OutsTable />', () => {
  it('should render correctly', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })
})
