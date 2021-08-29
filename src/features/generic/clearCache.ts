

export = () => {
    // for (const path in require.cache) {
    //     if (path.endsWith('.js')) { // only clear *.js, not *.node
    //       delete require.cache[path]
    //     }
    //   }
    delete require.cache[require.resolve('./controller.ts')]
    delete require.cache[require.resolve('./index.ts')]
    delete require.cache[require.resolve('./model.ts')]
    delete require.cache[require.resolve('./router.ts')]
}