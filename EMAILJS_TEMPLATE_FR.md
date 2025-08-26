# Configuration du Template EmailJS en Français

## 📧 Template EmailJS Recommandé

### Sujet de l'email :
```
Nouveau message depuis votre portfolio - {{subject}}
```

### Contenu du template :
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nouveau message - Portfolio Christ Ekra</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">{{portfolio_name}}</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Nouveau message reçu</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
        
        <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #667eea; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                📬 Informations du contact
            </h2>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #555;">👤 Nom :</strong> {{name}}
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #555;">📧 Email :</strong> 
                <a href="mailto:{{email}}" style="color: #667eea; text-decoration: none;">{{email}}</a>
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #555;">📅 Date :</strong> {{date}} à {{time}}
            </div>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #667eea; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                📝 Détails du message
            </h3>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #555;">🎯 Sujet :</strong> {{subject}}
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #555;">💬 Message :</strong>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; font-style: italic;">
                {{message}}
            </div>
        </div>
        
        <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
            <h4 style="margin-top: 0; color: #667eea;">💡 Actions recommandées :</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Répondre rapidement au contact</li>
                <li>Évaluer la pertinence du projet</li>
                <li>Proposer une consultation si nécessaire</li>
            </ul>
        </div>
        
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
        <p style="margin: 0; color: #666; font-size: 14px;">
            Cet email a été envoyé depuis votre portfolio professionnel.<br>
            <strong>Christ Ekra</strong> - Développeur Web Full Stack
        </p>
    </div>
    
</body>
</html>
```

## 🔧 Configuration dans EmailJS

### 1. Aller sur votre dashboard EmailJS
- Connectez-vous à : https://dashboard.emailjs.com/

### 2. Modifier votre template
- Allez dans "Email Templates"
- Sélectionnez votre template `template_wjuqlmh`
- Remplacez le contenu par le template ci-dessus

### 3. Variables utilisées
Le template utilise ces variables :
- `{{name}}` - Nom du contact
- `{{email}}` - Email du contact
- `{{subject}}` - Sujet du message
- `{{message}}` - Contenu du message
- `{{portfolio_name}}` - Nom du portfolio
- `{{date}}` - Date d'envoi
- `{{time}}` - Heure d'envoi

### 4. Sauvegarder
- Cliquez sur "Save" pour enregistrer les modifications

## 🎨 Personnalisation

Vous pouvez personnaliser :
- **Couleurs** : Changez les codes couleur (#667eea, #764ba2)
- **Logo** : Ajoutez votre logo dans l'en-tête
- **Style** : Modifiez la police, les espacements
- **Contenu** : Adaptez les textes à votre style

## ✅ Test

Après avoir mis à jour le template, testez votre formulaire de contact pour voir le nouveau design !
