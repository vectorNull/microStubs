// NextJS is sometimes a bit finiky about file change detection
// while running in K8s. This helps resolve that issue. 
module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    }
}