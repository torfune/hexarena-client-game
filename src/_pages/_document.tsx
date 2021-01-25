import React from 'react'

// class Document extends NextDocument {
//   static async getInitialProps(ctx: DocumentContext) {
//     const initialProps = await NextDocument.getInitialProps(ctx)
//     return initialProps
//   }
//
//   render() {
//     return (
//       <Html lang="en">
//         <Head>
//           <meta charSet="UTF-8" />
//           <meta
//             name="description"
//             content="HexArena.io is a 100% free multiplayer, live action, strategy game."
//           />
//           <meta
//             property="og:description"
//             content="HexArena.io is a 100% free multiplayer, live action, strategy game."
//           />
//           <meta property="og:title" content="HexArena.io" />
//           <meta property="og:url" content="https://hexarena.io" />
//           <meta
//             property="og:image"
//             content="https://hexarena.io/static/images/og-image.png"
//           />
//           <meta property="og:image:width" content="1200" />
//           <meta property="og:image:height" content="630" />
//           <meta
//             name="viewport"
//             content="width=device-width, initial-scale=1.0"
//           />
//           <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//
//           {/*<title>HexArena.io</title>*/}
//
//           <link
//             rel="icon"
//             type="image/x-icon"
//             href="/static/favicon/96x96.png"
//           />
//           <link
//             href="https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700'"
//             rel="stylesheet"
//           />
//
//           <script
//             src="https://browser.sentry-cdn.com/5.6.3/bundle.min.js"
//             crossOrigin="anonymous"
//           ></script>
//
//           <script
//             dangerouslySetInnerHTML={{
//               __html: `
//             const getEnvironment = () => {
//               switch (window.location.hostname) {
//               case 'localhost':
//               return 'local'
//               case 'dev.hexarena.io':
//               return 'development'
//               case 'hexarena.io':
//               return 'production'
//               default:
//               return 'unknown-environment'
//             }
//             }
//               Sentry.init({
//               dsn: 'https://28bb77120c0b45a991f6c251a58ffa63@sentry.io/1438180',
//               environment: getEnvironment(),
//             })
//           `,
//             }}
//           ></script>
//
//           <script
//             async
//             src="https://www.googletagmanager.com/gtag/js?id=UA-68180597-3"
//           ></script>
//
//           {/*<script>*/}
//           {/*  window.dataLayer = window.dataLayer || []*/}
//           {/*  function gtag() {*/}
//           {/*  dataLayer.push(arguments)*/}
//           {/*}*/}
//           {/*  gtag('js', new Date())*/}
//           {/*  gtag('config', 'UA-68180597-3')*/}
//           {/*</script>*/}
//
//           {/*<script>*/}
//           {/*  window.fbAsyncInit = function() {*/}
//           {/*  FB.init({*/}
//           {/*    appId: '2146819318950261',*/}
//           {/*    cookie: true,*/}
//           {/*    xfbml: true,*/}
//           {/*    version: 'v3.3',*/}
//           {/*  })*/}
//
//           {/*  FB.AppEvents.logPageView()*/}
//           {/*}*/}
//           {/*  ;(function(d, s, id) {*/}
//           {/*  var js,*/}
//           {/*  fjs = d.getElementsByTagName(s)[0]*/}
//           {/*  if (d.getElementById(id)) {*/}
//           {/*  return*/}
//           {/*}*/}
//           {/*  js = d.createElement(s)*/}
//           {/*  js.id = id*/}
//           {/*  js.src = 'https://connect.facebook.net/en_US/sdk.js'*/}
//           {/*  fjs.parentNode.insertBefore(js, fjs)*/}
//           {/*})(document, 'script', 'facebook-jssdk')*/}
//           {/*</script>*/}
//         </Head>
//
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }
//
// export default Document
