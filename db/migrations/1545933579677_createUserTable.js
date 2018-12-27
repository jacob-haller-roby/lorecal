module.exports = {
    "up": "CREATE TABLE user (" +
        "  `id` INT NOT NULL AUTO_INCREMENT," +
        "  `username` VARCHAR(45) NOT NULL," +
        "  `password` VARCHAR(45) NULL," +
        "  `email` VARCHAR(45) NOT NULL," +
        "  `createdAt` VARCHAR(45) NOT NULL," +
        "  PRIMARY KEY (`id`));",
    "down": "DROP TABLE users"
}