import router from "./router";
import cc from './clearCache';
// const clearCache = require('./clearCache');

cc()

export = function (itemName: any, obj: {}) {
    return router(itemName, obj);
}
