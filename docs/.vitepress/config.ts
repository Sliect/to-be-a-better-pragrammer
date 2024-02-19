import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';

function getChildrenFilesFrom(file) {
  let components: { text: string; link: string }[] = [];
  let dirPath = path.resolve(__dirname, '../' + file);
  const files = fs.readdirSync(dirPath);
  files.forEach(function (item) {
    let stat = fs.lstatSync(dirPath + '/' + item);
    if (stat.isDirectory() === false) {
      const name = item.slice(0, -3);
      components.push({
        text: name,
        link: `/${file}/${name}`,
      });
    }
  });
  // 中文在前 英文在后
  return components.sort((a, b) => a.text.localeCompare(b.text));
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,

  title: "Sliect's Log",
  description: 'good good study, day day up!',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'frontendmaster', link: '/frontendmaster/babel' },
      { text: 'cs', link: '/cs/计算机网络' },
      {
        text: 'github',
        link: 'https://github.com/Sliect/to-be-a-better-pragrammer',
      },
    ],

    sidebar: [
      {
        text: 'frontendmaster',
        items: getChildrenFilesFrom('frontendmaster'),
      },
      {
        text: 'cs',
        items: getChildrenFilesFrom('cs'),
      },
      {
        text: 'others',
        items: getChildrenFilesFrom('others'),
      },
      {
        text: 'zhaowa',
        items: getChildrenFilesFrom('zhaowa'),
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
