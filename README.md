# Reto 3 — Automatización Mobile

Proyecto de automatización mobile **cross-platform** para la app **My Demo App** de SauceLabs.
Construido con **WebdriverIO + TypeScript + Appium**, aplicando **Page Object Model**.

- **Android** → emulador local
- **iOS** → cloud (SauceLabs free trial — no requiere Xcode)

---

## Tabla de contenidos

1. [Escenarios automatizados](#1-escenarios-automatizados)
2. [Por qué son viables de automatizar](#2-por-qué-son-viables-de-automatizar)
3. [Stack técnico](#3-stack-técnico)
4. [Prerrequisitos](#4-prerrequisitos)
5. [Instalación](#5-instalación)
6. [Configuración](#6-configuración)
7. [Ejecución](#7-ejecución)
8. [Reportes y evidencias](#8-reportes-y-evidencias)
9. [Estructura del proyecto](#9-estructura-del-proyecto)
10. [Pipeline Jenkins](#10-pipeline-jenkins)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Escenarios automatizados

Se automatizan funcionalidades **diferentes** por sistema operativo (como pide el reto):

### Android — Flujo crítico de COMPRA E2E
`test/specs/android/purchase-flow.e2e.ts`

```
1. Apertura de la app (catálogo visible)
2. Navegación al menú lateral
3. Login con usuario válido (bod@example.com / 10203040)
4. Selección de producto "Sauce Labs Backpack"
5. Validación del título y precio en el detalle
6. Add to cart
7. Validación de items en el carrito
8. Checkout: dirección de envío
9. Checkout: información de pago
10. Place Order
11. Validación de pantalla de confirmación
```

### iOS — Navegación de catálogo + sort + detalle
`test/specs/ios/catalog-navigation.e2e.ts`

```
1. Apertura de la app (catálogo visible)
2. Conteo de productos visibles
3. Aplicación de sort "Price - High to Low"
4. Captura del primer producto (más caro)
5. Tap en producto → pantalla de detalle
6. Validación de título y precio
7. Swipe en galería de imágenes (gesto nativo)
8. Validación del botón Add To Cart
9. Calificación con 5 estrellas
```

---

## 2. Por qué son viables de automatizar

Cada escenario fue evaluado contra los **6 criterios de viabilidad** de automatización:

| Criterio | Compra Android | Catálogo iOS |
|---|---|---|
| **Estabilidad del flujo** | Alta — flujo core del producto, no cambia entre releases | Alta — catálogo es la primera pantalla, UI estable |
| **ROI (frecuencia de ejecución)** | Muy alto — se debe correr en cada release | Alto — regresión visual de la home |
| **Criticidad de negocio** | Crítica — sin checkout no hay revenue | Media — descubrimiento de producto |
| **Repetibilidad determinista** | Sí — usuario y datos hardcodeados, no afecta stock real | Sí — sort es función pura, no afecta estado |
| **Factibilidad técnica con Appium** | Sí — todos los elementos nativos, accesibilidad expuesta | Sí — UIKit nativo, gestos soportados por XCUITest |
| **Independencia de datos** | Sí — credenciales fijas, productos pre-cargados | Sí — no requiere login ni datos transaccionales |

**Conclusión**: ambos escenarios cumplen los 6 criterios → **automatización justificada y rentable**.

---

## 3. Stack técnico

| Capa | Tecnología |
|---|---|
| Lenguaje | TypeScript |
| Test runner | WebdriverIO v9 |
| Framework de tests | Mocha (BDD) |
| Automatización mobile | Appium 2.x |
| Driver Android | UiAutomator2 |
| Driver iOS | XCUITest |
| Cloud iOS | SauceLabs (free trial) |
| Reportes | Allure + Spec Reporter |
| CI/CD | Jenkins (Jenkinsfile incluido) |
| Patrón | Page Object Model (POM) |

---

## 4. Prerrequisitos

| Software | Versión | Necesario para |
|---|---|---|
| Node.js | ≥ 20 | Todo |
| npm | ≥ 10 | Todo |
| Java JDK | 17+ | Android (UiAutomator2) |
| Android Studio / SDK | API 34+ | Android local |
| Android Emulator | Pixel 6 API 34 | Android local |
| Appium | 2.x | (se instala vía npm) |
| Cuenta SauceLabs | Free trial | iOS cloud |

**ANDROID_HOME** debe estar exportado:
```bash
echo $ANDROID_HOME
# /Users/<user>/Library/Android/sdk
```

---

## 5. Instalación

```bash
# Clonar / posicionarse en el proyecto
cd reto3-mobile-automation

# Instalar dependencias
npm install

# Instalar drivers Appium (si no están globalmente)
npx appium driver install uiautomator2
npx appium driver install xcuitest

# Verificar setup de Appium (Android)
npm run appium:doctor
```

---

## 6. Configuración

### 6.1 Variables de entorno

Copiá la plantilla y completá:

```bash
cp env.example .env
```

Editá `.env`:
```ini
SAUCE_USERNAME=tu_usuario_saucelabs
SAUCE_ACCESS_KEY=tu_access_key
SAUCE_REGION=us-west-1
SAUCE_IOS_APP=storage:filename=My-Demo-App.ipa

ANDROID_APP_PATH=./apps/mda-2.2.0-25.apk
ANDROID_DEVICE_NAME=Pixel_6_API_34
ANDROID_PLATFORM_VERSION=14
```

### 6.2 APK Android

Descargar la última versión desde:
https://github.com/saucelabs/my-demo-app-android/releases

Guardar el `.apk` en `apps/` y ajustar `ANDROID_APP_PATH` en `.env`.

### 6.3 IPA iOS en SauceLabs

1. Descargar el IPA: https://github.com/saucelabs/my-demo-app-ios/releases
2. Subir a SauceLabs App Storage: https://app.saucelabs.com/storage/files
3. Copiar el nombre del archivo a `SAUCE_IOS_APP` en `.env`

### 6.4 Emulador Android

Crear emulador desde Android Studio → Device Manager:
- Pixel 6
- System Image: API 34 (Android 14)
- Name: `Pixel_6_API_34` (debe coincidir con `ANDROID_DEVICE_NAME`)

Levantar manualmente antes de correr los tests:
```bash
$ANDROID_HOME/emulator/emulator -avd Pixel_6_API_34
```

---

## 7. Ejecución

### Android (local)

```bash
# Emulador debe estar corriendo
npm run test:android
```

### iOS (SauceLabs cloud)

```bash
npm run test:ios
```

### Ambos secuencialmente

```bash
npm run test:all
```

---

## 8. Reportes y evidencias

### Allure

Después de correr los tests:

```bash
npm run report
```

Abre el reporte HTML en `allure-report/`.

> ⚠️ **IMPORTANTE — Allure es acumulativo**
>
> Allure SUMA los resultados de TODOS los runs anteriores que estén en `allure-results/`. Si tenés runs viejos con fallos (locators desactualizados, tests con nombres diferentes), el reporte va a mostrarlos como "Test defects" aunque ya estén arreglados.
>
> **Siempre limpiá antes de regenerar un reporte limpio:**
> ```bash
> npm run clean       # borra allure-results, allure-report, screenshots, logs
> npm run test:all    # corre Android + iOS frescos
> npm run report      # genera reporte limpio (100% pass esperado)
> ```
>
> En CI/CD esto se hace automático con stages secuenciales en el `Jenkinsfile`.

### Screenshots automáticos

En cada test que **falla**, el hook `afterTest` captura un screenshot en `screenshots/` y lo adjunta al reporte Allure.

### SauceLabs (iOS)

Los tests en SauceLabs generan:
- Video completo de la ejecución
- Logs de Appium
- Screenshots por step
- Disponible en: https://app.saucelabs.com/

---

## 9. Estructura del proyecto

```
reto3-mobile-automation/
├── apps/                              # APKs/IPAs locales (no van a git)
├── config/
│   ├── wdio.shared.conf.ts            # config base (reporters, hooks, timeouts)
│   ├── wdio.android.conf.ts           # caps Android local
│   └── wdio.ios.saucelabs.conf.ts     # caps iOS cloud
├── src/
│   ├── pages/
│   │   ├── BasePage.ts                # clase base de POM
│   │   ├── android/                   # POs Android (UiAutomator2)
│   │   │   ├── CatalogPage.ts
│   │   │   ├── MenuPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── ProductDetailPage.ts
│   │   │   ├── CartPage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   └── CheckoutCompletePage.ts
│   │   └── ios/                       # POs iOS (XCUITest)
│   │       ├── CatalogPage.ts
│   │       └── ProductDetailPage.ts
│   └── helpers/
│       └── gestures.ts                # W3C Actions: swipe cross-platform
├── test/
│   └── specs/
│       ├── android/
│       │   └── purchase-flow.e2e.ts
│       └── ios/
│           └── catalog-navigation.e2e.ts
├── Jenkinsfile
├── env.example
├── tsconfig.json
├── package.json
└── README.md
```

### Decisiones de arquitectura

- **POs separados por SO**: locators de Android (UiAutomator2) y iOS (XCUITest) son distintos. Mismo concepto (`CatalogPage`), distinta implementación.
- **BasePage abstracta**: centraliza `waitForLoaded`, `tap`, `setValue`, `readText`. Si cambian las esperas, se cambia en un solo lugar.
- **`loadedIndicator`**: cada PO declara el selector que confirma que la pantalla cargó. Evita race conditions.
- **Tests sólo conocen POs**: no aparece un `$(...)` en los specs. Esto es **POM canónico**.
- **Gestos en `helpers/gestures.ts`**: W3C Actions (no TouchAction deprecado).

---

## 10. Pipeline Jenkins

El `Jenkinsfile` declara un pipeline con stages:

1. **Checkout** del código
2. **Install** (`npm ci`)
3. **TypeScript check** (`tsc --noEmit`)
4. **Test Android** (levanta emulador, corre tests)
5. **Test iOS** (en SauceLabs)
6. **Allure Report**
7. **Archive artifacts**

Credenciales necesarias en Jenkins (`Manage Jenkins → Credentials`):
- `sauce-username` (Secret text)
- `sauce-access-key` (Secret text)

Parámetros de build:
- `RUN_ANDROID` (default `true`)
- `RUN_IOS` (default `true`)

---

## 11. Troubleshooting

### Android: "Could not find a connected Android device"
- Verificar que el emulador esté corriendo: `adb devices`
- Si no aparece: arrancar el emulador manualmente y esperar a que termine de bootear

### Android: "Element not found"
- Los locators usan `accessibility id` (content-desc). Verificar con **Appium Inspector**:
  ```bash
  npx appium-inspector
  ```
- Si la versión del APK cambia los content-desc, actualizar los selectores en `src/pages/android/`.

### iOS: "SauceLabs authentication failed"
- Verificar `SAUCE_USERNAME` y `SAUCE_ACCESS_KEY` en `.env`
- Verificar la `region` correcta (us-west-1, eu-central-1, etc.)

### iOS: "App not found in storage"
- Subir el IPA a SauceLabs App Storage
- `SAUCE_IOS_APP` debe ser exactamente: `storage:filename=<nombre-del-ipa>`

### Appium server no arranca
- Liberar puerto 4723: `lsof -ti:4723 | xargs kill -9`
- Verificar drivers instalados: `npx appium driver list`

---

## Autora

Adriana Troche — Máster Profesional en QA y Automatización de Pruebas
