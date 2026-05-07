<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />

<br /><br />

```
 ██████╗ █████╗ ██████╗ ████████╗██╗███████╗██╗   ██╗
██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝╚██╗ ██╔╝
██║     ███████║██████╔╝   ██║   ██║█████╗   ╚████╔╝
██║     ██╔══██║██╔══██╗   ██║   ██║██╔══╝    ╚██╔╝
╚██████╗██║  ██║██║  ██║   ██║   ██║██║        ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝        ╚═╝
```

### Modern E-Commerce Experience

**[🛍️ Live Demo](https://cartify-mert.vercel.app/)** · **[📁 Repository](https://github.com/mertkaya20/shop-app)** · **[👤 GitHub](https://github.com/mertkaya20/)** · **[💼 LinkedIn](https://www.linkedin.com/in/merttkaya20/)**

</div>

---

## 🇹🇷 Türkçe

### 📖 Proje Hakkında

Cartify, modern frontend mimarisi prensiplerini ve best practice yaklaşımlarını gerçek bir kullanım senaryosunda uygulamak amacıyla geliştirilmiş tam kapsamlı bir e-ticaret web uygulamasıdır. [FakeStoreAPI](https://fakestoreapi.com/) ile entegre çalışır; ürün listeleme, sepet yönetimi ve kullanıcı kimlik doğrulama akışlarını içerir.

Projenin temel amacı güzel bir arayüz oluşturmak değil; **neden, nasıl ve ne zaman** sorusunu yanıtlayacak şekilde React ekosisteminin temel araçlarını doğru katmanlarda kullanmayı öğrenmektir.

---

### 🚀 Özellikler

- 🔐 **JWT Kimlik Doğrulama** — Login / Logout, token localStorage'da persist edilir
- 🛒 **Sepet Yönetimi** — Ürün ekleme, çıkarma, miktar güncelleme, localStorage senkronizasyonu
- 🔍 **Ürün Arama & Filtreleme** — Gerçek zamanlı arama ve kategori bazlı filtreleme
- 📦 **Ürün Detay Sayfası** — Rating, miktar seçimi, sepete ekle
- 💳 **Checkout Akışı** — Form validasyonu (Yup), sipariş özeti, başarı sayfası
- 👤 **Kullanıcı Profili** — Hesap bilgileri, sepet istatistikleri
- 🔔 **Bildirim Sistemi** — Eylem bazlı toast notification (Redux tabanlı)
- 🛡️ **Route Koruması** — ProtectedRoute ve PublicRoute bileşenleri
- 📱 **Tam Responsive** — Mobile-first Tailwind CSS tasarımı
- ⚡ **Akıllı Cache** — TanStack Query ile otomatik caching ve background refetch

---

### 🏗️ Mimari & Teknik Kararlar

#### Neden TanStack Query + Redux birlikte?

Bu iki araç çakışmaz; farklı sorunları çözer:

| Araç               | Ne Zaman?                            | Neden?                                                                                                           |
| ------------------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **TanStack Query** | GET istekleri (ürünler, kategoriler) | Caching, loading/error state, background refetch otomatik gelir. Her component aynı datayı tekrar çekmez.        |
| **Redux Toolkit**  | Client-side state (cart, auth, UI)   | Sunucudan gelmeyen, uygulamaya özgü global state. Persist edilmesi, birden fazla component'tan okunması gerekir. |

#### Katmanlı Mimari

```
src/
├── api/              # Axios instance + HTTP helper fonksiyonlar
│   ├── axiosInstance.js     → Base URL, timeout, header config
│   ├── productsApi.js       → GET /products, GET /products/:id vb.
│   ├── authApi.js           → POST /auth/login
│   └── cartApi.js           → Cart CRUD (gerçek backend için hazır)
│
├── hooks/            # Custom React hook'ları — iş mantığı burada
│   ├── useProducts.js       → useQuery ile ürün hook'ları
│   ├── useAuth.js           → useMutation ile login/logout
│   ├── useCart.js           → Redux cart action'larını sarar
│
├── store/            # Redux Toolkit store
│   └── slices/
│       ├── authSlice.js     → user, token, isAuthenticated
│       ├── cartSlice.js     → items, totalPrice, totalQuantity
│       └── uiSlice.js       → notification state
│
├── pages/            # Route bazlı sayfalar
├── components/       # Yeniden kullanılabilir bileşenler
│   ├── layout/       → Navbar, Footer, ProtectedRoute, PublicRoute
│   ├── product/      → ProductCard, ProductGrid
│   ├── cart/         → CartItem
│   └── ui/           → Button, Input, Spinner, Notification, ErrorBoundary
```

#### Neden Custom Hook Katmanı?

Component'lar `useDispatch`, `useSelector`, `useQuery` gibi implementation detaylarını bilmemeli. Her component sadece şunu bilir:

```js
const { data, isLoading } = useAllProducts();
const { addToCart } = useCart();
const { mutate: login } = useLogin();
```

Böylece ileride Redux → Zustand veya Axios → fetch geçişi yapılsa, sadece hook değişir; component'lar dokunulmadan çalışır.

---

### 🔄 Kullanıcı Akışları

```
[Ziyaretçi]
    │
    ├── Ana Sayfa → Ürünleri Listele → Filtrele / Ara
    │       │
    │       └── Ürün Detay → Sepete Ekle (Notification)
    │
    └── Login Sayfası → JWT Token Al → Redux & localStorage'a Kaydet
            │
            ├── Ana Sayfa (auth sonrası)
            ├── Sepet → Checkout → Sipariş Başarılı (Cart temizlenir)
            └── Profil Sayfası → Logout
```

---

### 🛠️ Kullanılan Teknolojiler

| Teknoloji       | Versiyon | Kullanım Amacı                             |
| --------------- | -------- | ------------------------------------------ |
| React           | 18       | UI bileşen kütüphanesi                     |
| Vite            | 5        | Build tool ve dev server                   |
| Redux Toolkit   | Latest   | Global client-side state yönetimi          |
| TanStack Query  | v5       | Server state, caching, async veri yönetimi |
| React Router v6 | v6       | Client-side routing                        |
| Axios           | Latest   | HTTP istemcisi                             |
| Tailwind CSS    | v3       | Utility-first CSS framework                |
| React Hook Form | Latest   | Performanslı form yönetimi                 |
| Yup             | Latest   | Form validasyon şeması                     |
| Lucide React    | Latest   | İkon kütüphanesi                           |
| FakeStoreAPI    | —        | Mock REST API                              |

---

### ⚙️ Kurulum

```bash
# 1. Repository'yi klonla
git clone https://github.com/mertkaya20/shop-app.git
cd shop-app

# 2. Bağımlılıkları yükle
npm install

# 3. Geliştirme sunucusunu başlat
npm run dev

# 4. Tarayıcıda aç
# http://localhost:5173
```

#### Demo Hesabı

```
Kullanıcı adı : mor_2314
Şifre         : 83r5^_
```

---

### 📁 Branch Stratejisi

```
main
└── develop
    ├── feature/initial-setup      → Proje iskelet kurulumu
    ├── feature/api-setup          → Axios & API katmanı
    └── feature/hooks              → Custom hook'lar
```

Her feature branch develop'a merge edilir. main her zaman kararlı (stable) branch'tir.

---

### 🔮 Gelecek Geliştirmeler

- [ ] Gerçek backend entegrasyonu (Node.js + MongoDB)
- [ ] Cypress E2E testleri
- [ ] React Testing Library unit testleri
- [ ] Favori / wishlist sistemi
- [ ] Sipariş geçmişi
- [ ] Dark mode

---

<br />

## 🇬🇧 English

### 📖 About

Cartify is a full-featured e-commerce web application built to practice modern frontend architecture principles and best practices in a real-world scenario. It integrates with [FakeStoreAPI](https://fakestoreapi.com/) and includes product listing, cart management, and user authentication flows.

The primary goal was not to build a pretty UI but to learn how to use the core tools of the React ecosystem correctly — asking **why, how, and when** for every architectural decision.

---

### 🚀 Features

- 🔐 **JWT Authentication** — Login / Logout, token persisted in localStorage
- 🛒 **Cart Management** — Add, remove, update quantity, localStorage sync
- 🔍 **Search & Filter** — Real-time search and category-based filtering
- 📦 **Product Detail Page** — Rating display, quantity selector, add to cart
- 💳 **Checkout Flow** — Form validation (Yup), order summary, success page
- 👤 **User Profile** — Account info, cart statistics
- 🔔 **Notification System** — Action-based toast notifications (Redux-powered)
- 🛡️ **Route Guards** — ProtectedRoute and PublicRoute components
- 📱 **Fully Responsive** — Mobile-first Tailwind CSS design
- ⚡ **Smart Caching** — Automatic caching and background refetch via TanStack Query

---

### 🏗️ Architecture & Technical Decisions

#### Why TanStack Query + Redux together?

These two tools don't conflict — they solve different problems:

| Tool               | When?                               | Why?                                                                                                                          |
| ------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **TanStack Query** | GET requests (products, categories) | Caching, loading/error state, background refetch come automatically. Components don't re-fetch the same data.                 |
| **Redux Toolkit**  | Client-side state (cart, auth, UI)  | State that doesn't come from a server — app-specific global state that needs to persist and be read from multiple components. |

#### Why a Custom Hooks Layer?

Components should not know implementation details like `useDispatch`, `useSelector`, or `useQuery`. Each component only knows:

```js
const { data, isLoading } = useAllProducts();
const { addToCart } = useCart();
const { mutate: login } = useLogin();
```

This means if Redux is swapped for Zustand or Axios for fetch in the future, only the hook changes — components remain untouched.

---

### ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/mertkaya20/shop-app.git
cd shop-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

#### Demo Credentials

```
Username : mor_2314
Password : 83r5^_
```

---

### 📬 Contact

<div align="center">

**Mert Kaya**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mertkaya20/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/merttkaya20/)

</div>

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/mertkaya20/">Mert Kaya</a></sub>
</div>
