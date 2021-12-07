const queries = {
    updateKitByKitalistamiento : 'UPDATE dbo.kit SET mesacertificada = @mesacertificada, fechamesacertificada = @fechamesacertificada WHERE kitalistamiento = @kitalistamiento',
    getUser : "SELECT u.USERID FROM password p INNER JOIN [user] u ON p.USERID = u.USERID WHERE u.USERID = @userid AND p.TEMP_PASS = @password",
    getKit : "SELECT  * FROM kit k where kitalistamiento = @kitalistamiento"

}

module.exports = {queries}