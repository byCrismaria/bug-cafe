const sendPasswordResetEmail = async (toEmail, token) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-senha?token=${token}`;

    // Modo dev: sem EMAIL_HOST configurado, loga o link no console
    if (!process.env.EMAIL_HOST) {
        console.log('\n' + '='.repeat(52));
        console.log('  LINK DE REDEFINIÇÃO DE SENHA (modo dev)');
        console.log(`  Para: ${toEmail}`);
        console.log(`  Link: ${resetUrl}`);
        console.log('='.repeat(52) + '\n');
        return;
    }

    // Produção / staging: usa SMTP configurado no .env
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Bug Café" <noreply@bugcafe.com>',
        to: toEmail,
        subject: 'Redefinição de senha — Bug Café',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
                <h2 style="color: #b45309;">🐞 Bug Café</h2>
                <h3>Redefinição de Senha</h3>
                <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
                <p>Clique no botão abaixo para criar uma nova senha.
                   O link expira em <strong>1 hora</strong>.</p>
                <a href="${resetUrl}"
                   style="display:inline-block; padding: 12px 28px; background-color: #b45309;
                          color: #fff; text-decoration: none; border-radius: 6px; margin: 16px 0;
                          font-weight: bold;">
                    Redefinir Senha
                </a>
                <p style="color: #777; font-size: 13px; margin-top: 24px;">
                    Se você não solicitou essa redefinição, ignore este e-mail.
                    Sua senha permanece a mesma.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
                <p style="color: #aaa; font-size: 11px;">Bug Café — Sistema de Fidelidade</p>
            </div>
        `,
    });
};

module.exports = { sendPasswordResetEmail };
