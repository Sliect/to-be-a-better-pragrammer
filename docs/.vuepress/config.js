const fs = require('fs')
const path = require('path')

function getChildrenFilesFrom(file) {
  let components = []
  let dirPath = path.resolve(__dirname,  '../' + file)
  const files = fs.readdirSync(dirPath)
  files.forEach(function (item) {
      let stat = fs.lstatSync(dirPath + '/' + item)
      if (stat.isDirectory() === false) { 
        components.push(item)
      }
  })
  // 中文在前 英文在后
  return components.sort((a, b) => a.localeCompare(b))
}

module.exports = {
  title: 'Sliect\'s Log',
  description: 'Sliect\'s Log',
  themeConfig: {
    nav: [
      { text: 'frontendmaster', link: '/frontendmaster/babel' },
      { text: 'cs', link: '/cs/计算机网络' },
      { text: 'others', link: '/others/程序员的哲学' },
      { text: 'github', link: 'https://github.com/Sliect/to-be-a-better-pragrammer' }
    ],
    sidebar: {
      '/frontendmaster/': [
        {
          title: 'frontendmaster',
          collapsable: false,
          sidebarDepth: 2,
          children: getChildrenFilesFrom('frontendmaster')
        }
      ],
      '/others/': [
        {
          title: '其它',
          collapsable: false,
          children: getChildrenFilesFrom('others')
        }
      ],
      '/zhaowa/': [
        {
          title: 'zhaowa',
          collapsable: false,
          children: getChildrenFilesFrom('zhaowa')
        }
      ],
      // '/': [
      //   '',        /* / */
      // ]
    }
  }
}