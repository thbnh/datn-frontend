const { override } = require('customize-cra');

module.exports = override((config) => {
    // Thêm cấu hình resolve.fallback
    config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'),
        
    };

    return config;
});
