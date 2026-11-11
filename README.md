# ✦ Messagerie (Chat.io)

Messagerie temps réel avec **appels audio** et **messages vocaux**, 100 % statique (aucun serveur à gérer) : chaque page HTML embarque son CSS et son JavaScript — **aucun fichier `.css` ni `.js` séparé** — et dialogue directement avec **Firebase Realtime Database**. Les messages vocaux, photos et fichiers sont stockés **dans la base de données elle-même** (data URL) : **Firebase Storage n'est pas nécessaire**.

## Fonctionnalités

- Comptes par nom / prénom + mot de passe (stockés dans Firebase Realtime Database)
- Conversations privées et groupes
- Messages texte, images et fichiers
- 🎙 **Messages vocaux** — compatibles iPhone et Android (conversion automatique en WAV si nécessaire)
- 🖼 Photos re-compressées automatiquement côté expéditeur ; fichiers jusqu'à 6 Mo — tout est stocké dans la base de données
- 📞 **Appels audio** en peer-to-peer (WebRTC) : sonnerie, muet, refus, « pas de réponse », détection de coupure
- 📱 Bouton **⬇ Installer** qui installe l'application (PWA) — sur iPhone, guide vers « Partager → Sur l'écran d'accueil »
- ⚙️ Centre d'administration (`connection.html`)

## Déploiement sur GitHub Pages

1. Poussez tous les fichiers à la **racine** d'un dépôt GitHub.
2. `Settings` → `Pages` → `Build and deployment` → Source : `Deploy from a branch`, branche `main`, dossier `/ (root)`.
3. Attendez ~1 minute puis ouvrez `https://<votre-pseudo>.github.io/<nom-du-repo>/`.

> ⚠️ Le micro (messages vocaux + appels) exige **HTTPS** ou `localhost`. GitHub Pages est en HTTPS : tout fonctionne directement. En local, servez le dossier (ex. extension « Live Server » de VS Code) — ouvrir le fichier en `file://` bloque le micro.

## Configuration Firebase

La configuration (constante `firebaseConfig`) est présente **dans le script de chaque page** : modifiez-la aux 4 endroits (`index.html`, `call.html`, `admin.html`, `connection.html`) — ou faites simplement un recherche/remplacement de l'ID du projet sur les 4 fichiers. La base doit être en mode test (règles ouvertes) ou avec des règles autorisant la lecture/écriture. Aucun autre service Firebase n'est requis (pas de Storage, pas d'Auth).

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Application principale (chat, vocaux, appels) — HTML + CSS + JS inclus |
| `call.html` | Page d'appel audio (WebRTC) — autonome |
| `connection.html` | Connexion administrateur — autonome |
| `admin.html` | Centre d'administration — autonome |
| `manifest.webmanifest` + `icon-192.png` + `icon-512.png` | Icône / écran d'accueil |
| `404.html` | Redirection vers l'accueil sur GitHub Pages (autonome, volontairement) |
