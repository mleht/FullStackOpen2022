import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


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

  screen.debug(component.container)

  expect(component.container).toHaveTextContent('test title')
  expect(component.container).toHaveTextContent('test author')
  expect(component.container).not.toHaveTextContent('www.test.net')
  expect(component.container).not.toHaveTextContent(13)

})
