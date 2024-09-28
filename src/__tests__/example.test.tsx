import { render, screen } from '@testing-library/react'
import Header from '@components/Header' // Header bileşenini buraya uygun bir şekilde bağlayın

test('renders header text', () => {
  render(<Header />)
  const linkElement = screen.getByText(/Header/i)
  expect(linkElement).toBeInTheDocument()
})
