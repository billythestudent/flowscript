# FlowScript

<div align="center">

![FlowScript Logo](https://img.shields.io/badge/FlowScript-Visual%20Programming-6366f1?style=for-the-badge&logo=javascript&logoColor=white)

**Görsel blokları sürükle-bırak yöntemiyle bağlayarak kod oluşturun.**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

[Demo](#) • [Özellikler](#özellikler) • [Kurulum](#kurulum) • [Kullanım](#kullanım) • [Lisans](#lisans)

</div>

---

## 📖 Hakkında

FlowScript, programlamayı görsel ve eğlenceli hale getiren bir araçtır. Node tabanlı bir arayüz kullanarak blokları sürükleyip bırakın, bağlantılar oluşturun ve gerçek zamanlı olarak kod üretin.

## ✨ Özellikler

### 🧩 Node Türleri
- **Giriş/Çıkış** - Veri girişi ve sonuç görüntüleme
- **Fonksiyon** - uppercase, lowercase, reverse, trim, length
- **Matematik** - Toplama, çıkarma, çarpma, bölme, üs alma
- **Metin** - Split, replace, substring, repeat, concat
- **Mantık** - Contains, equals, greater, less, startsWith
- **Tarih** - Şu anki zaman, tarih formatlama, gün hesaplama
- **JSON** - Parse, stringify, get, set, keys, values
- **Dizi** - Length, sort, filter, sum, avg, min, max
- **API** - Mock HTTP istekleri (GET, POST, PUT, DELETE)
- **Gecikme** - Akış kontrolü için bekleme
- **Birleştir** - Birden fazla girdiyi birleştirme
- **Rastgele** - Sayı, UUID, boolean üretimi
- **Not** - Açıklama ve dokümantasyon

### 🎨 Arayüz
- 🌙 Karanlık / Aydınlık tema desteği
- 🗺️ Mini harita ile kolay navigasyon
- ↩️ Geri al / Yinele (Ctrl+Z / Ctrl+Y)
- 📋 6 hazır şablon
- 💾 Otomatik kaydetme (localStorage)
- 📤 JSON olarak dışa/içe aktarma

### ⌨️ Klavye Kısayolları
| Kısayol | İşlev |
|---------|-------|
| `Ctrl + Z` | Geri Al |
| `Ctrl + Y` | Yinele |
| `Ctrl + S` | Dışa Aktar |
| `Ctrl + Enter` | Çalıştır |
| `Delete` | Seçili bloğu sil |
| `?` | Yardım menüsü |
| `Escape` | Modalları kapat |

## 🚀 Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/billythestudent/flowscript.git

# Proje klasörüne gidin
cd flowscript

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## 🛠️ Teknolojiler

- **React 19** - UI framework
- **Vite** - Build tool
- **React Flow** - Node-based editor
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

## 📁 Proje Yapısı

```
flowscript/
├── src/
│   ├── components/
│   │   ├── nodes/           # Node bileşenleri
│   │   ├── Header.jsx       # Üst menü
│   │   ├── Sidebar.jsx      # Yan panel
│   │   ├── LandingPage.jsx  # Ana sayfa
│   │   └── ...
│   ├── hooks/
│   │   ├── useFlowManager.js  # Akış yönetimi
│   │   ├── useUndoRedo.js     # Geri al/yinele
│   │   └── useTheme.jsx       # Tema yönetimi
│   ├── utils/
│   │   ├── flowUtils.js     # Yardımcı fonksiyonlar
│   │   └── storage.js       # localStorage işlemleri
│   ├── App.jsx
│   └── main.jsx
├── LICENSE
├── package.json
└── README.md
```

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

## 📄 Lisans

Bu proje [Apache License 2.0](LICENSE) lisansı altında lisanslanmıştır.

```
Copyright 2026 Halil İbrahim

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
```

## 👤 Yazar

**Billy**

---

<div align="center">

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

Made with ❤️ by Billy

</div>
