'use strict';

function filterScriptTags(tag) {
    return tag.tagName === 'script';
}

function addCrossoriginAttrubuteToScript(script) {
    script.attributes.crossorigin = 'anonymous';
}

function addCrossoriginAttrubuteToScripts(htmlPluginData, callback) {
    htmlPluginData.head.filter(filterScriptTags).forEach(addCrossoriginAttrubuteToScript);
    htmlPluginData.body.filter(filterScriptTags).forEach(addCrossoriginAttrubuteToScript);

    callback(null, htmlPluginData);
}

function HtmlWebpackCrossoriginPlugin() {}

HtmlWebpackCrossoriginPlugin.prototype.apply = function(compiler) {
    // Hook into the html-webpack-plugin processing
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-alter-asset-tags', function(htmlPluginData, callback) {
            addCrossoriginAttrubuteToScripts(htmlPluginData, callback);
        });
    });
};

module.exports = HtmlWebpackCrossoriginPlugin;
