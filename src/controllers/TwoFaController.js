const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

class TwoFaController {
    gerartokens(req, res) {
        const secret = speakeasy.generateSecret({ length: 20 });
        QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
            res.json({ token: secret.base32, data_url });
        });
    }

    validartoken(req, res) {
        const { token, token_digitado } = req.body;
        const tokenValido = speakeasy.totp.verify({
            secret: token,
            encoding: 'base32',
            token: token_digitado
        });

        res.json({ tokenValido });
    }

}

module.exports = new TwoFaController();