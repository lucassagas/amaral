import { AppProvider } from '@/contexts/index'
import { useOuts } from '@/services/hooks/useOuts'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { GetServerSidePropsContext } from 'next'
import Outs, { getServerSideProps } from '.'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

jest.mock('@/services/hooks/useOuts', () => ({
  useOuts: jest.fn(),
}))

const mockedOuts = {
  outs: [
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
  ],
  totalOuts: 1,
}

const renderComponent = () => {
  return render(
    <AppProvider>
      <Outs />
    </AppProvider>
  )
}

describe('<Outs/>', () => {
  it('should render correctly', () => {
    ;(useOuts as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: {
        outs: mockedOuts.outs,
      },
    }))

    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  it('should render error when return error', () => {
    ;(useOuts as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      error: true,
    }))
    renderComponent()

    expect(
      screen.getByText(/falha ao obter dados das saídas\./i)
    ).toBeInTheDocument()
  })

  it('should render loading when isLoading', () => {
    ;(useOuts as jest.Mock).mockImplementation(() => ({
      isLoading: true,
    }))
    renderComponent()

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument()
  })

  it('should refetch data when click in refetch button', async () => {
    ;(useOuts as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      refetch: jest.fn(),
    }))

    renderComponent()

    const button = screen.getByRole('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(useOuts).toHaveBeenCalled()
  })

  it('should test server side props ', async () => {
    const response = await getServerSideProps({} as GetServerSidePropsContext)

    expect(response).toBeDefined()
  })
})
