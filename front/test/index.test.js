import React from 'react'
import {render, screen} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { DataRows } from '../src/components/DataRows'

test('Display text when is loading', async () => {
  render(<DataRows loading />)
  expect(screen.getByText('Espere mientras se procesa la información ...')).toBeEnabled()
})

test('Display text when is not have data', async () => {
  render(<DataRows />)
  expect(screen.getByText('Este archivo no cuenta con información')).toBeEnabled()
})

test('Display data', async () => {
  const data = { info: [
                  {
                    file: 'file1',
                    text: 'some text',
                    number: 12312,
                    hex: '12312abd'
                  }
                ]}
  render(<DataRows data={data} />)
  expect(screen.getByText('file1')).toBeInTheDocument()
})