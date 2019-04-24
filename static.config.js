import React from 'react'
import path from 'path'



const description = "SocialFitter is a web app that fits your pictures to Instagram post and more...";
const image = "https://windinteractive.com/img/5510seo.jpg?v=2:1";
const title = "SocialFitter | Wind Interactive";

export default {
  devServer: {
    port: 3000,
    host: '127.0.0.1',
  },
  // siteRoot: "https://erikccoder.github.io",
  // basePath: "social-fitter",
  // assetsPath: "../social-fitter",
  Document: ({ Html, Head, Body, children, siteData, renderMeta })=>(
      <Html lang="en-US">
      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:locale" content="en_US"/>
        <meta property="og:type" content="object"/>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:site_name" content={title} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />

        <meta property="place:location:latitude" content="22.316600" />
        <meta property="place:location:longitude" content="114.212471" />
        <meta property="business:contact_data:street_address" content="32, 12/F, Pacific Trade Centre, 2-2 Kai Hing Rd" />
        <meta property="business:contact_data:locality" content="Kowloon" />
        <meta property="business:contact_data:country" content="Hong Kong" />
        <meta property="business:contact_data:postal_code" content="999077" />

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:title" content={title} />
        <meta property="og:image" content={image} />
        <meta name="twitter:image" content={image} />
      </Head>
      <Body>
      {children}
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-132674150-6"></script>
      <script dangerouslySetInnerHTML={{__html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-132674150-6');
`}}>
      </script>

      </Body>
      </Html>
  ),
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
