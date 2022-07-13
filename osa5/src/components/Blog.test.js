import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


test('renders content', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'www.test.net',
    likes: 13
  }

  const component = render(
    <Blog blog={blog} />
  )

  // screen.debug(component.container)

  expect(component.container).toHaveTextContent('test title')
  expect(component.container).toHaveTextContent('test author')
  expect(component.container).not.toHaveTextContent('www.test.net')
  expect(component.container).not.toHaveTextContent(13)

})

test('after clicking the View details button, url & likes are displayed', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'www.test.net',
    likes: 13,
    user: { name: 'testUser' }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('View details')
  await user.click(button)

  screen.debug(component.container)

  expect(component.container).toHaveTextContent('www.test.net')
  expect(component.container).toHaveTextContent(13)

})

test('like button is clicked twice', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'www.test.net',
    likes: 13,
    user: { name: 'testUser' }
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const user = userEvent.setup()
  const buttonDetails = screen.getByText('View details')
  await user.click(buttonDetails)
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
