require('dotenv').config();
module.exports = {
    port: process.env.PORT || 5000,
    db: process.env.DB_URL || 'mongodb://localhost:27017/TagTheImage',
    jwtSecret: process.env.JWT_SECRET || 'secret',
    // apiUrl: `http://localhost:${this.port}/api/`,
}