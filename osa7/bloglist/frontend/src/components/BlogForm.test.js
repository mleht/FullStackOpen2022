import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('the form calls the event handler it received as props with the right details', async () => {
  const user = userEvent.setup()
  const addBlog = jest.fn()

  render(<BlogForm addBlog={addBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')

  const CreateButton = screen.getByText('Create')

  await user.type(titleInput, 'test1')
  await user.type(authorInput, 'test2')
  await user.type(urlInput, 'test3')
  await user.click(CreateButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('test1')
  expect(addBlog.mock.calls[0][0].author).toBe('test2')
  expect(addBlog.mock.calls[0][0].url).toBe('test3')
})
