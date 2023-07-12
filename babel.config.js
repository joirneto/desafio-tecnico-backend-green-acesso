module.exports = function (api) {
    api.cache(true);

    const presets = [
        ['@babel/preset-env', {targets: {node: 'current'}, debug: false, modules: 'commonjs'}],
    ];

    const plugins = ['source-map-support'];

    return {
        presets,
        plugins,
    };
};
