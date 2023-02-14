module.exports = {
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    images: {
        domains: ["cdn.sanity.io"],
    },
    async redirects() {
        return [{
            source: "/examples",
            destination: "https://github.com/mlcommons/medperf#experiments",
            permanent: true,
        }, ];
    },
};