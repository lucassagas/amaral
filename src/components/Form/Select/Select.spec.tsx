import { AppProvider } from '@/contexts/index'
import { render, screen } from '@testing-library/react'
import { Select } from './Select'

const register = jest.fn()

const renderComponent = () => {
  return render(
    <AppProvider>
      <Select
        name="name"
        label="Nome"
        register={register}
        options={[{ name: 'John Doe', value: '1' }]}
      />
    </AppProvider>
  )
}

describe('<Select />', () => {
  it('should render correctly', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  it('should render component with error', () => {
    render(
      <AppProvider>
        <Select
          name="name"
          label="Nome"
          register={register}
          options={[{ name: 'John Doe', value: '1' }]}
          errors={{ name: 'required' }}
        />
      </AppProvider>
    )

    expect(screen.getByText(/campo obrigatório/i)).toMatchSnapshot()
  })
})
