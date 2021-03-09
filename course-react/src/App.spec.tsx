import { render, fireEvent } from '@testing-library/react'
import { FileWatcherEventKind } from 'typescript'
import { App, Todo } from './App'

jest.mock('axios', () => ({
  get: () => {
    return {
      data: [
        {
          id: 1,
          userId: 1,
          title: 'Do some work',
          completed: false
        },
        {
          id: 2,
          userId: 1,
          title: 'Learn Jest',
          completed: true
        }
      ]
    }
  }
}))

describe('App', () => {
  it('renders', async () => {
    const screen = render(<App />)
    expect(
      screen.getByText(/Hello world!/)
    ).toBeTruthy()

    expect(
      await screen.findAllByTestId('todo')
    ).toHaveLength(2)

    fireEvent.click(
      screen.getByText(/Toggle/)
    )

    expect(
      await screen.findAllByTestId('todo')
    ).toHaveLength(1)
  })
})