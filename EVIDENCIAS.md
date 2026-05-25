# Evidencias de Ejecución — Reto 3

Documento de entrega con evidencias de la ejecución de la suite de automatización mobile.

> Este archivo se completa después de correr los tests. Las secciones marcadas como `[PENDIENTE]` se actualizan con capturas y datos reales tras la primera ejecución exitosa.

---

## 1. Resumen ejecutivo

| Métrica | Valor |
|---|---|
| Plataformas cubiertas | Android (local) + iOS (SauceLabs cloud) |
| Tests E2E implementados | 2 (1 por plataforma) |
| Page Objects implementados | 9 (7 Android + 2 iOS) |
| Cobertura funcional | Login + Catálogo + Detalle + Carrito + Checkout (Android) — Catálogo + Sort + Detalle + Gestos (iOS) |
| Framework | WebdriverIO v9 + Appium 2 + TypeScript |

---

## 2. Ejecución Android

### Comando ejecutado
```bash
npm run test:android
```

### Configuración usada
- Emulador: Pixel 6 API 34 (Android 14)
- APK: `mda-2.2.0-25.apk` (My Demo App)
- Appium driver: UiAutomator2

### Resultado
`[PENDIENTE — completar tras primera corrida]`

```
Spec Reporter output:
...
```

### Capturas
- `screenshots/android-purchase-flow-completed.png` `[PENDIENTE]`
- `screenshots/android-checkout-complete.png` `[PENDIENTE]`

### Tiempo total
`[PENDIENTE]`

---

## 3. Ejecución iOS (SauceLabs)

### Comando ejecutado
```bash
npm run test:ios
```

### Configuración usada
- Cloud: SauceLabs (us-west-1)
- Device: iPhone Simulator iOS 17
- App: `My-Demo-App.ipa` (subido a Sauce App Storage)
- Appium driver: XCUITest

### Resultado
`[PENDIENTE — completar tras primera corrida]`

### Enlace al run en SauceLabs
`https://app.saucelabs.com/tests/<id>` `[PENDIENTE]`

### Video y screenshots
Disponibles en el dashboard de SauceLabs:
- Video completo MP4 de la sesión
- Screenshots automáticos por step
- Logs de Appium server

### Tiempo total
`[PENDIENTE]`

---

## 4. Reporte Allure

### Comando
```bash
npm run report
```

### Captura del dashboard
`[PENDIENTE — pegar captura del reporte HTML generado]`

### Métricas del run
- Tests pasados: `[PENDIENTE]`
- Tests fallidos: `[PENDIENTE]`
- Tiempo total: `[PENDIENTE]`

---

## 5. Pipeline Jenkins

### Captura del pipeline corriendo
`[PENDIENTE — si se sube a un Jenkins real]`

### Build artifacts archivados
- `allure-report/`
- `screenshots/`
- `logs/`

---

## 6. Conclusiones

- Ambos escenarios automatizados fueron seleccionados aplicando los 6 criterios de viabilidad documentados en el README.
- La arquitectura POM permite reutilización: la `BasePage` centraliza esperas y los POs por plataforma encapsulan locators sin acoplar tests.
- Separar Android (local) e iOS (cloud) demuestra integración con servicios externos sin requerir Xcode local.
- El Jenkinsfile habilita ejecución continua con parámetros (`RUN_ANDROID` / `RUN_IOS`) para flexibilidad en CI.

---

## 7. Próximos pasos (mejoras futuras)

- Sumar tests negativos (login con credenciales inválidas)
- Sumar matriz de devices en SauceLabs (varios iOS / Android)
- Integrar con BrowserStack como alternativa
- Sumar tests de regresión visual con `@wdio/visual-service`
- Generar reportes de cobertura funcional cruzando con criterios de aceptación
