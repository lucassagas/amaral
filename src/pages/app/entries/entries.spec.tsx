import { AppProvider } from '@/contexts/index'
import { useEntries } from '@/services/hooks/useEntries'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { GetServerSidePropsContext } from 'next'
import Entries, { getServerSideProps } from '.'

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

jest.mock('@/services/hooks/useEntries', () => ({
  useEntries: jest.fn(),
}))

const mockedEntries = {
  entries: [
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
  totalEntries: 1,
}

const renderComponent = () => {
  return render(
    <AppProvider>
      <Entries />
    </AppProvider>
  )
}

describe('<Entries/>', () => {
  it('should render correctly', () => {
    ;(useEntries as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: {
        entries: mockedEntries.entries,
      },
    }))

    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  it('should render error when return error', () => {
    ;(useEntries as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      error: true,
    }))
    renderComponent()

    expect(
      screen.getByText(/falha ao obter dados das entradas\./i)
    ).toBeInTheDocument()
  })

  it('should render loading when isLoading', () => {
    ;(useEntries as jest.Mock).mockImplementation(() => ({
      isLoading: true,
    }))
    renderComponent()

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument()
  })

  it('should refetch data when click in refetch button', async () => {
    ;(useEntries as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      refetch: jest.fn(),
    }))

    renderComponent()

    const button = screen.getByRole('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(useEntries).toHaveBeenCalled()
  })

  it('should test server side props ', async () => {
    const response = await getServerSideProps({} as GetServerSidePropsContext)

    expect(response).toBeDefined()
  })
})
