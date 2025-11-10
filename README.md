# Müzikle - Günlük Müzik Tahmin Oyunu

Wordle tarzı günlük müzik tahmin oyunu. Her gün farklı şarkılar

## Oyun Kuralları

- Her gün 3 kategori: **Tümü**, **Rock**, **Hip-hop**
- Şarkıyı en kısa sürede 6 denemede tahmin et: 0.1s → 0.5s → 2s → 4s → 8s → 15s
- Fuzzy search ile yazım hatalarına toleranslı
- Günde sadece 1 kere oynanabilir

## Özellikler

- **Günlük Challenge**: Seed-based şarkı seçimi (Mulberry32)
- **3 Kategori**: Tümü (66 şarkı), Rock (51 şarkı), Hip-hop (62 şarkı)
- **LocalStorage**: Progress otomatik kaydediliyor
- **Otomatik Gün Değişimi**: Gece yarısında sıfırlanıyor

## Teknolojiler

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- YouTube Data API v3
- Seeded Random (Mulberry32 algoritması)
