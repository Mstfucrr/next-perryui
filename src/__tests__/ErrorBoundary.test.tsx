import React from 'react'
import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../components/error-boundary'
import { expect, test } from 'vitest'

const ProblematicComponent = () => {
  throw new Error('Test error')
}

test('it catches errors and displays fallback UI', () => {
  render(
    <ErrorBoundary>
      <ProblematicComponent />
    </ErrorBoundary>
  )

  expect(screen.getByText(/Oops! Bir şeyler yanlış gitti/i)).toBeDefined()
  expect(screen.getByText(/Uygulamamızda beklenmeyen bir hata oluştu/i)).toBeDefined()
})
