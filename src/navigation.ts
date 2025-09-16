import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: '首頁', href: getPermalink('/') },
    { text: '關於我們', href: getPermalink('/about') },
    { text: '服務項目', href: getPermalink('/services') },
    { text: '專案案例', href: getPermalink('/portfolio') },
    { text: 'BLOG/木工新知', href: getBlogPermalink() },
    { text: '聯絡我們', href: getPermalink('/contact') },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: '網站導覽',
      links: [
        { text: '首頁', href: getPermalink('/') },
        { text: '關於我們', href: getPermalink('/about') },
        { text: '服務項目', href: getPermalink('/services') },
        { text: '專案案例', href: getPermalink('/portfolio') },
        { text: 'BLOG/木工新知', href: getBlogPermalink() },
        { text: '聯絡我們', href: getPermalink('/contact') },
      ],
    },
    {
      title: '聯絡資訊',
      links: [
        { text: 'Email: info@nice8.works', href: 'mailto:info@nice8.works' },
        { text: '地址: 235新北市中和區板南路520巷5號', href: '#' },
        { text: '營業時間: 週一至週五 08:00-17:00', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: '條款', href: getPermalink('/terms') },
    { text: '隱私權政策', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://facebook.com/nice8works',
    },
    {
      ariaLabel: 'Instagram',
      icon: 'tabler:brand-instagram',
      href: 'https://instagram.com/nice8works',
    },
  ],
  footNote: `
    © 大鋒室內裝修工程有限公司 · All rights reserved.
  `,
};

