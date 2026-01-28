# nwsapi-bug-focus-within
Showcases difference between browser and nwsapi implementation of contains(':focus-within')

To reproduce

1. open index.html in a browser, such as Chrome, see that all three tests pass.
2. run `npm i && npm run test`, see that the same three tests fail in jsdom using nwsapi
