let token = null

const blogs = [
  {
    id: "5b1fb4575b22f939e7b46efa",
    user: {
      _id: "5b1f90d6afbb051c1c7a7eeb",
      username: "herrax",
      name: "Herra X"
    },
    likes: 2,
    title: "Mehiläisiä blogi",
    author: "M Bee",
    url: "bee.com"
  },
  {
    id: "5b1fe6ce031a28517adfc3b4",
    user: {
      _id: "5b1fcf1fc73dc74508ef2d23",
      username: "herray",
      name: "Herra Y"
    },
    likes: 0,
    title: "Luonto blogi",
    author: "Puu Pää",
    url: "luonto.com"
  },
  {
    id: "5b32bb39e7179a021a5c88c1",
    likes: 0,
    title: "Anonyymi blogi 33",
    author: "B Aaa",
    url: "kukisti.com"
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }
