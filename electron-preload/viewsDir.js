module.exports = [
  {
    name: 'index',
    path: '/index',
  },
  {
    name: 'search',
    path: '/search',
  },
  {
    name: 'playlist',
    path: '/playlist',
  },
  {
    name: 'mvlist',
    path: '/mvlist',
  },
  {
    name: 'rank',
    path: '/rank',
  },
  {
    name: 'artistlist',
    path: '/artistlist',
  },
  {
    name: 'singer',
    path: '/singer',
    children: [
      {
        name: 'test',
        path: '/test',
      },
    ]
  }
]
