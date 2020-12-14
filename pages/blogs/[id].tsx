import * as React from 'react'

const BlogId = ({ blog }) => {
  return (
    <main>
      <h1 className="title">{blog.title}</h1>
      <p className="publisedAt">{blog.publishedAt}</p>
      <p className="category">{blog.category && `${blog.category.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  )
}

export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }

  const res = await fetch('https://ydaydada.microcms.io/api/v1/blogs', key)
  const repos = await res.json()

  const paths = repos.contents.map(repo => `/blogs/${repo.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async context => {
  const id = context.params.id

  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }

  const res = await fetch(
    `https://ydaydada.microcms.io/api/v1/blogs/${id}`,
    key
  )
  const blog = await res.json()

  return {
    props: {
      blog: blog,
    },
  }
}

export default BlogId
