# 🍳 Kuchnia Remix

Silnik wyszukiwania przepisów językiem angielskim używając Spooncular API oraz Next.js


# ⚠️ UWAGA
Jeżeli instalujesz stronę na systemie Windows, niektóre komendy, bądź ich składnia mogą wymagać manualnej korekty.
## 🛠 Wymagania

- Node.js 18+
- npm lub yarn
- Klucz Spoonacular API

## 🚀 Jak zacząć

1. **Sklonuj repozytorium**

```bash
git clone https://github.com/KamTheGreen/kuchnia-remix.git
cd kuchnia-remix
```

2. **Zainstaluj pakiety**
```bash
npm install

```

3. Stwórz plik .env
```bash
cp .env.example .env
```

4. Edytuj plik .env, dodając swój klucz SpooncularAPI
```bash
SPOONACULAR_API_KEY=twój-klucz-API
```
5.Zainstaluj i zbuduj aplikacje
```bash
npx prisma
npm run build
```
6.Uruchom aplikacje sieciową na swoim urządzeniu
```bash
npm run start
```
Jeżeli nie posiadasz swojego klucza api możesz go zdobyć w linku po niżej:
https://spoonacular.com/food-api