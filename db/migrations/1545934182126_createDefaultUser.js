module.exports = {
    "up": "INSERT INTO user (`username`,`email`,`createdAt`) VALUES ('jroby', 'jscotroby@gmail.com', NOW());",
    "down": "delete from user where username = 'jroby'"
}