/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        domains: ["ht-mobileassets.s3.amazonaws.com", "s3-us-west-2.amazonaws.com"],
    },
    webpack: (config) => {
        config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
        return config;
    },
};

export default nextConfig;
