# 🚀 CONFIGURAÇÃO NO SERVIDOR - DADOS REAIS

## ⚠️ IMPORTANTE: APENAS NO SERVIDOR!

Este guia é para configurar os dados reais **APENAS NO SERVIDOR DE PRODUÇÃO**.
**NUNCA** commite o arquivo `.env` com dados reais!

## 📋 PASSO A PASSO

### 1. Conectar no Servidor
```bash
# Via FTP, cPanel ou SSH
# Navegar até a pasta do site
```

### 2. Criar Arquivo .env
```bash
# Copiar o template
cp env.example .env

# Editar com dados reais
nano .env
```

### 3. Configurar .env com Dados Reais
```env
# PowerLine - Configuração de Produção
# ⚠️ NUNCA commitar este arquivo!

# Configurações de Email SMTP - DADOS REAIS
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=contato.powerline.servicos@gmail.com
SMTP_PASSWORD=SENHA_APP_GMAIL_REAL_AQUI
SMTP_SECURE=tls

# Emails de destino - DADOS REAIS
TO_EMAIL=contato.powerline.servicos@gmail.com
FROM_EMAIL=noreply@powerline.com.br
FROM_NAME=PowerLine - Elétrica Inteligente

# Google Analytics - VOCÊ CONFIGURARÁ
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# WhatsApp e Telefone - DADOS REAIS JÁ CONFIGURADOS
WHATSAPP_NUMBER=557988452633
PHONE_NUMBER=+557988452633

# Configurações de Segurança - OPCIONAL
RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Ambiente
ENVIRONMENT=production
```

## 🔐 CONFIGURAÇÃO DO GMAIL

### Passo 1: Ativar 2FA no Gmail
1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Vá em **Segurança**
3. Ative **Verificação em duas etapas**

### Passo 2: Criar App Password
1. Em **Segurança** → **Senhas de app**
2. Selecione **Email** e **Outro (nome personalizado)**
3. Digite: "PowerLine Site"
4. **COPIE A SENHA GERADA** (16 caracteres)
5. Use esta senha no `.env`

### Exemplo:
```env
SMTP_PASSWORD=abcd efgh ijkl mnop
```

## 📊 GOOGLE ANALYTICS

### Configurar GA4:
1. Acesse [analytics.google.com](https://analytics.google.com)
2. Criar propriedade "PowerLine"
3. Copiar o ID (formato: G-XXXXXXXXXX)
4. Atualizar no `.env`:
```env
GA_MEASUREMENT_ID=G-SEU_ID_REAL_AQUI
```

## ✅ VERIFICAÇÃO

### 1. Testar Configuração:
```bash
# No servidor, verificar se PHP lê as variáveis
php -r "echo $_ENV['SMTP_USERNAME'];"
```

### 2. Testar Formulário:
- Acessar o site
- Preencher formulário de contato
- Verificar se email chega em `contato.powerline.servicos@gmail.com`

### 3. Verificar Logs:
```bash
# Ver logs de erro do PHP
tail -f /var/log/php_errors.log
```

## 🔒 SEGURANÇA FINAL

### Permissões do Arquivo:
```bash
# Proteger o arquivo .env
chmod 600 .env
chown www-data:www-data .env
```

### Verificar .gitignore:
```bash
# Confirmar que .env está ignorado
git status
# .env NÃO deve aparecer na lista
```

## 📞 SUPORTE

### Se algo não funcionar:
1. **Verificar logs** do servidor
2. **Testar credenciais** do Gmail manualmente
3. **Confirmar permissões** dos arquivos
4. **Verificar se** o provedor permite SMTP

### Contatos de Emergência:
- **Email**: contato.powerline.servicos@gmail.com
- **WhatsApp**: +55 79 98845-2633

---

**✅ TUDO CONFIGURADO COM DADOS REAIS!**
**🔒 SEGURANÇA GARANTIDA COM VARIÁVEIS DE AMBIENTE!**
