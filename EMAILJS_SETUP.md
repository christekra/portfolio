# Configuration EmailJS avec Gmail SMTP

## 🚀 Guide de configuration étape par étape

### 1. Configuration EmailJS

#### Étape 1 : Créer un compte EmailJS
1. Allez sur [emailjs.com](https://www.emailjs.com/)
2. Cliquez sur "Sign Up" et créez un compte
3. Confirmez votre email

#### Étape 2 : Configurer le service Gmail
1. Dans votre dashboard EmailJS, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Sélectionnez "Gmail"
4. Connectez-vous avec votre compte Gmail (chtistekra@gmail.com)
5. Autorisez EmailJS à accéder à votre compte

#### Étape 3 : Créer un template d'email
1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Utilisez ce template :

```html
Nouveau message de contact de {{from_name}}

📧 Email: {{from_email}}
📋 Sujet: {{subject}}

💬 Message:
{{message}}

---
Ce message a été envoyé depuis votre portfolio.
Répondez directement à cet email pour contacter {{from_name}}.
```

4. Sauvegardez le template et notez le **Template ID**

#### Étape 4 : Obtenir vos clés
1. **Service ID** : Dans "Email Services", copiez l'ID de votre service Gmail
2. **Template ID** : Dans "Email Templates", copiez l'ID de votre template
3. **Public Key** : Dans "Account" > "API Keys", copiez votre clé publique

### 2. Configuration dans le code

#### Remplacer les placeholders dans `src/components/Contact.js` :

```javascript
// Ligne 18 - Remplacer par votre clé publique
emailjs.init("VOTRE_CLE_PUBLIQUE_ICI");

// Lignes 47-49 - Remplacer par vos IDs
const response = await emailjs.send(
  'VOTRE_SERVICE_ID_ICI', // Service ID Gmail
  'VOTRE_TEMPLATE_ID_ICI', // Template ID
  templateParams
);
```

### 3. Configuration Gmail (Clé d'application)

#### Étape 1 : Activer l'authentification à 2 facteurs
1. Allez dans [myaccount.google.com](https://myaccount.google.com/)
2. Sécurité > Authentification à 2 facteurs > Activer

#### Étape 2 : Créer une clé d'application
1. Sécurité > Authentification à 2 facteurs > Clés d'application
2. Sélectionnez "Autre (nom personnalisé)"
3. Nom : "Portfolio EmailJS"
4. Copiez la clé générée (16 caractères)

#### Étape 3 : Configurer EmailJS avec la clé
1. Dans EmailJS, allez dans votre service Gmail
2. Cliquez sur "Edit"
3. Dans "Password", entrez votre clé d'application (pas votre mot de passe Gmail)
4. Sauvegardez

### 4. Test de configuration

#### Test simple :
1. Remplissez le formulaire de contact
2. Envoyez un message de test
3. Vérifiez que vous recevez l'email sur chtistekra@gmail.com

### 5. Variables disponibles dans le template

```javascript
{{from_name}}     // Nom de l'expéditeur
{{from_email}}    // Email de l'expéditeur
{{subject}}       // Sujet du message
{{message}}       // Contenu du message
{{to_name}}       // Votre nom (Christ Ekra)
{{to_email}}      // Votre email (chtistekra@gmail.com)
{{reply_to}}      // Email de réponse
```

### 6. Sécurité et bonnes pratiques

#### ✅ Recommandé :
- Utilisez toujours une clé d'application (pas votre mot de passe)
- Limitez les permissions EmailJS au minimum
- Surveillez l'utilisation dans votre dashboard EmailJS
- Testez régulièrement le formulaire

#### ❌ À éviter :
- Ne partagez jamais vos clés API
- N'utilisez pas votre mot de passe Gmail principal
- Ne laissez pas les clés dans le code public

### 7. Dépannage

#### Problème : "Service not found"
- Vérifiez que le Service ID est correct
- Assurez-vous que le service Gmail est bien configuré

#### Problème : "Template not found"
- Vérifiez que le Template ID est correct
- Assurez-vous que le template est publié

#### Problème : "Authentication failed"
- Vérifiez votre clé d'application Gmail
- Assurez-vous que l'authentification à 2 facteurs est activée

#### Problème : "Quota exceeded"
- Le plan gratuit EmailJS a des limites
- Surveillez votre utilisation dans le dashboard

### 8. Plan gratuit EmailJS

- **200 emails/mois** gratuitement
- **1 service email** autorisé
- **2 templates** autorisés
- **Support communautaire**

### 9. Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur (F12)
2. Consultez les logs EmailJS dans votre dashboard
3. Testez avec un email simple
4. Contactez le support EmailJS si nécessaire

---

## 🎯 Résultat final

Une fois configuré, votre formulaire de contact :
- ✅ Envoie des emails via Gmail SMTP
- ✅ Utilise votre clé d'application sécurisée
- ✅ Affiche des messages de confirmation
- ✅ Fonctionne en temps réel
- ✅ Est sécurisé et fiable

Votre portfolio aura un système de contact professionnel et fonctionnel ! 📧✨
