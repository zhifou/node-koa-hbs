
'use strict';

/**
 * Generates an object of renderjson helpers.
 *
 * @type {Function}
 * @param {Object} handlebars Handlebars instance.
 * @return {Object} Object of helpers.
 */
function renderJson(handlebars) {
    let helpers = {
        /**
         * @method renderJson
         * @param {Object} items
         * @param {String} objectName
         * @param {Object} options
         * @return {String} Rendered partial.
         */
        renderJson: function (items, objectName, options) {
            console.log(objectName);
            let ret = JSON.stringify(items);
            let out = `<script>
                        let ${objectName} = ${ret};
                   </script>`;
            return out;
        }


    };

    return helpers;
}

/**
 * Registers layout helpers on a Handlebars instance.
 *
 * @method register
 * @param {Object} handlebars Handlebars instance.
 * @return {Object} Object of helpers.
 * @static
 */
renderJson.register = function (handlebars) {
    let helpers = renderJson(handlebars);

    handlebars.registerHelper(helpers);

    return helpers;
};

module.exports = renderJson;
