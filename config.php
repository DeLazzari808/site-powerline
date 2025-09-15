<?php
/**
 * PowerLine - Configurações do Sistema
 * Arquivo de configuração para hospedagem
 */

// Configurações de Email - CONFIGURAR COM DADOS REAIS
define('SMTP_HOST', 'smtp.gmail.com'); // ou smtp do provedor de hospedagem
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'contato@powerline.com.br'); // EMAIL REAL DA POWERLINE
define('SMTP_PASSWORD', 'APP_PASSWORD_AQUI'); // App Password do Gmail ou senha SMTP
define('SMTP_SECURE', 'tls'); // 'tls' ou 'ssl'

// Emails de destino
define('TO_EMAIL', 'contato@powerline.com.br'); // PARA ONDE VÃO OS EMAILS
define('FROM_EMAIL', 'noreply@powerline.com.br'); // EMAIL DE ENVIO
define('FROM_NAME', 'PowerLine - Elétrica Inteligente');

// Configurações de Segurança
define('RECAPTCHA_SITE_KEY', 'sua_recaptcha_site_key'); // Opcional
define('RECAPTCHA_SECRET_KEY', 'sua_recaptcha_secret_key'); // Opcional

// Configurações do Google Analytics
define('GA_MEASUREMENT_ID', 'G-XXXXXXXXXX'); // Substituir pelo ID real

// Configurações de Rate Limiting
define('RATE_LIMIT_SECONDS', 30); // Segundos entre envios
define('MAX_DAILY_EMAILS', 50); // Máximo de emails por IP por dia

// Configurações de Log
define('ENABLE_LOGGING', true);
define('LOG_FILE', 'contact_logs.txt');

// Configurações de Desenvolvimento/Produção
define('ENVIRONMENT', 'development'); // 'development' ou 'production'
define('DEBUG_MODE', ENVIRONMENT === 'development');

// Configurações de Banco de Dados (se necessário no futuro)
define('DB_HOST', 'localhost');
define('DB_NAME', 'powerline_db');
define('DB_USER', 'powerline_user');
define('DB_PASS', 'powerline_pass');

// Configurações de WhatsApp
define('WHATSAPP_NUMBER', '5511999999999'); // Número real da PowerLine

// Configurações de Telefone
define('PHONE_NUMBER', '+5511999999999'); // Telefone real da PowerLine

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Função para debug (apenas em desenvolvimento)
function debug_log($message) {
    if (DEBUG_MODE) {
        error_log('[PowerLine Debug] ' . $message);
    }
}

// Função para validar configurações
function validate_config() {
    $errors = [];
    
    if (!filter_var(TO_EMAIL, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'TO_EMAIL inválido';
    }
    
    if (!filter_var(FROM_EMAIL, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'FROM_EMAIL inválido';
    }
    
    if (empty(SMTP_HOST)) {
        $errors[] = 'SMTP_HOST não configurado';
    }
    
    return $errors;
}

// Validar configurações na inicialização
if (DEBUG_MODE) {
    $config_errors = validate_config();
    if (!empty($config_errors)) {
        debug_log('Erros de configuração: ' . implode(', ', $config_errors));
    }
}
?>
