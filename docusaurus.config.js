// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Dragon Age Annual",
  tagline: "An Unofficial Fan-Made Charity Dragon Age Calendar",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://www.dragonageannual.art",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/social-card.png",
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "Dragon Age Annual",
        items: [
          {
            to: "application",
            label: "Before You Apply",
            position: "left",
          },
          {
            to: "mods",
            label: "Meet the Mods",
            position: "left",
          },
          {
            to: "past",
            label: "Past Years",
            position: "left",
          },
          {
            type: "dropdown",
            label: "Community",
            position: "left",
            items: [
							{
                href: "https://bsky.app/profile/dragonageannual.bsky.social",
                label: "Bluesky",
              },
							{
                href: "https://bsky.app/profile/dragonageannual.bsky.social",
                label: "Bluesky",
              },
              {
                href: "https://twitter.com/DragonAgeAnnual/",
                label: "Twitter",
              },
              {
                href: "https://dragonageannual.tumblr.com",
                label: "Tumblr",
              },
							{
                href: "https://www.instagram.com/dragonageannual/",
                label: "Instagram",
              },
              {
                href: "https://da-annual.itch.io/",
                label: "Itch.io",
              },
            ],
          },
					{
            type: "dropdown",
            label: "Purchasing",
            position: "left",
            items: [
              // {
              //   href: "https://da-annual.itch.io/dragon-age-annual-2024",
              //   label: "Pre-Order",
              // },
							{
								to: "terms",
								label: "Terms and Conditions",
							},
              {
                href: "itchio",
                label: "Itch.io FAQs",
              },
            ],
          },
        ],
      },
      footer: {
        style: "dark",
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Dragon Age Annual. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [
        { name: "theme-color", content: "#e0bf60" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:creator", content: "DragonAgeAnnual" },
        { name: "twitter:domain", content: "dragonageannual.art" },
        { name: "twitter:url", content: "https://www.dragonageannual.art" },
        { name: "og:image", content: "/img/favicon.png" },
      ],
			// announcementBar: {
			// 	id: 'coming_soon',
			// 	content:
			// 		'✨ <a href="https://da-annual.itch.io/dragon-age-annual-2024">Pre-Order now</a>! ✨',
			// 	isCloseable: true,
			// },
    }),
};

module.exports = config;
