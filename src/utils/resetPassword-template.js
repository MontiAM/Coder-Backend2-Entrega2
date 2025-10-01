export const templateHtmlResetPassword = (resetUrl) => `
<div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
    <h2 style="color:#2c3e50;">Recuperación de contraseña</h2>
    <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
    <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
    <a href="${resetUrl}" 
        style="display:inline-block; padding:10px 20px; margin:10px 0; background-color:#3498db; color:#fff; text-decoration:none; border-radius:5px;">
        Restablecer contraseña
    </a>
    <p>Este enlace expirará en 15 minutos.</p>
    <p>Si no solicitaste este cambio, ignora este correo.</p>
    <hr>
    <p style="font-size:12px; color:#999;">© 2025 Tu Empresa</p>
</div>
`;
