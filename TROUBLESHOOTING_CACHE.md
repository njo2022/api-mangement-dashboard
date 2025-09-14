# 🔧 Dépannage - Erreurs de Cache

## 🚨 **Erreurs courantes et solutions**

### **Erreur ENOENT (File not found)**

Si vous rencontrez des erreurs comme :
```
⨯ [Error: ENOENT: no such file or directory, open '...\.next\static\development\_buildManifest.js.tmp.xxx']
```

**Solution :**
```bash
# Nettoyer le cache Next.js
npm run clean-cache

# Ou manuellement
Remove-Item -Recurse -Force .next
```

### **Erreurs de build**

Si le build échoue avec des erreurs de cache :
```bash
# Nettoyer et rebuilder
npm run clean-cache
npm run build
```

### **Serveur de développement qui ne démarre pas**

```bash
# Arrêter le serveur (Ctrl+C)
# Nettoyer le cache
npm run clean-cache
# Redémarrer
npm run dev
```

## 🛠️ **Scripts disponibles**

### **Nettoyage du cache**
```bash
npm run clean-cache
```
- Supprime le dossier `.next`
- Supprime le cache `node_modules/.cache`
- Prépare l'environnement pour un redémarrage propre

### **Redémarrage complet**
```bash
npm run clean-restart
```
- Nettoie le cache
- Redémarre le serveur de développement

## 🔍 **Diagnostic**

### **Vérifier l'état du cache**
```bash
# Vérifier si le dossier .next existe
ls .next

# Vérifier la taille du cache
du -sh .next
```

### **Logs détaillés**
```bash
# Démarrer avec des logs détaillés
DEBUG=* npm run dev
```

## 🚀 **Bonnes pratiques**

### **Éviter les problèmes de cache**
1. **Arrêter proprement** le serveur avec `Ctrl+C`
2. **Nettoyer régulièrement** le cache avec `npm run clean-cache`
3. **Ne pas modifier** les fichiers dans `.next/` manuellement
4. **Utiliser** les scripts npm fournis

### **En cas de problème persistant**
```bash
# Nettoyage complet
npm run clean-cache
rm -rf node_modules
npm install
npm run dev
```

## 📚 **Ressources**

- [Documentation Next.js - Troubleshooting](https://nextjs.org/docs/messages)
- [Next.js Cache Issues](https://nextjs.org/docs/advanced-features/debugging)
- [Turbopack Issues](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)

## 🆘 **Support**

Si les problèmes persistent :
1. Vérifiez la version de Node.js (`node --version`)
2. Vérifiez la version de Next.js (`npm list next`)
3. Consultez les logs d'erreur complets
4. Créez une issue avec les détails de l'erreur
