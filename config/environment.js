const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const logAccessStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});
const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    // db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'girikgarg8',
            pass: 'vkoykcvakuusschj'
        }
    },
    google_client_id: "523939841648-ubkv0cv9ve9f1b7mk4gvveos64cf9als.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "https://nameless-ocean-65145.herokuapp.com/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: { stream: logAccessStream }
    }
}
const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    // db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_RURL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: logAccessStream }
    }
}
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);