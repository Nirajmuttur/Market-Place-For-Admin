export default () => {
    return `<!doctype html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossorigin="anonymous"
            />
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap" rel="stylesheet">
            <style>*{font-family: 'Source Sans Pro', sans-serif;}</style>
            <title>Admin Panel</title>
            
        </head>
        <body>
            <div id="root"></div>
            <script type="text/javascript" src="/dist/bundle.js">
            </script>
        </body>
    </html>`
}