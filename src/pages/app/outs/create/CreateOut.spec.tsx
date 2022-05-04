import { AppProvider } from '@/contexts/index'
import { useProducts } from '@/services/hooks/useProducts'
import { act, fireEvent, render, screen } from '@testing-library/react'
import CreateOut from '.'

jest.mock('@/services/api')
jest.mock('@/services/hooks/useProducts', () => ({
  useProducts: jest.fn(),
}))

const mockedProducts = {
  data: {
    products: [
      {
        id: 'id',
        name: 'peixe',
        quantity: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    totalProducts: 1,
  },
}
const renderComponent = () => {
  ;(useProducts as jest.Mock).mockImplementation(() => mockedProducts)
  return render(
    <AppProvider>
      <CreateOut />
    </AppProvider>
  )
}

describe('<CreateOut />', () => {
  it('should render correctly', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  it('should register a out', async () => {
    const useMutationSpy = jest.spyOn(require('react-query'), 'useMutation')

    renderComponent()

    const quantity = '2'
    const quantityInput = screen.getByRole('textbox') as HTMLInputElement

    act(() => {
      fireEvent.change(quantityInput, { target: { value: quantity } })
    })

    expect(quantityInput.value).toEqual(quantity)

    const saveButton = screen.getByRole('button', {
      name: /salvar/i,
    })

    act(() => {
      fireEvent.click(saveButton)
    })

    expect(useMutationSpy).toHaveBeenCalled()
  })
})
