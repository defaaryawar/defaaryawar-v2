# Menyebarkan Data Services ke Sanity

Panduan lengkap untuk melakukan seed data services dari `src/data/services.ts` ke Sanity CMS.

## Prasyarat

Anda harus memiliki:
- Akun Sanity.io dengan project yang sudah dibuat
- Sanity dataset yang sudah ada (misalnya: `production`)
- Sanity auth token dengan akses write ke dataset

## Langkah 1: Dapatkan Sanity Auth Token

1. Buka [Sanity Dashboard](https://sanity.io/manage)
2. Pilih project Anda (`66p6lfv1`)
3. Ke **Settings → API** (atau tab yang sesuai)
4. Buat token baru dengan scope:
   - ✅ `datasets.manage`
   - ✅ `datasets.read`
   - ✅ `documents.read`
   - ✅ `documents.write`
   - ✅ `assets.manage`
5. Copy token tersebut

## Langkah 2: Setup Environment Variables

1. Copy `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` dan tambahkan Sanity auth token Anda:
   ```env
   VITE_SANITY_PROJECT_ID=66p6lfv1
   VITE_SANITY_DATASET=production
   VITE_SANITY_API_VERSION=2026-04-07
   SANITY_AUTH_TOKEN=your_sanity_token_here
   ```

> ⚠️ **PENTING**: File `.env` tidak akan di-commit ke git untuk security. Jangan share token Anda!

## Langkah 3: Install Dependencies

```bash
npm install
```

Ini akan menginstall `dotenv` yang diperlukan oleh seed script.

## Langkah 4: Jalankan Seed Script

```bash
npm run seed:services
```

Script akan:
- Connect ke Sanity project Anda
- Create/replace 8 service documents
- Tampilkan hasil seeding dengan summary

### Output Contoh:
```
🌱 Starting seed process...
📊 Total services to seed: 8
✅ Seeded: Website Landing Page
✅ Seeded: Website Portfolio
✅ Seeded: Website Company Profile
...
📈 Seed Summary:
✅ Successful: 8/8
❌ Failed: 0/8

🎉 All services seeded successfully!
```

## Informasi Schema

Script ini mengcreate documents dengan type `service`. Pastikan schema Sanity Anda sudah punya type ini:

Contoh minimal schema (jika diperlukan):
```javascript
{
  name: 'service',
  type: 'document',
  title: 'Service',
  fields: [
    {
      name: 'id',
      type: 'string',
      title: 'Service ID'
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name (ID)'
    },
    {
      name: 'nameEn',
      type: 'string',
      title: 'Name (English)'
    },
    // ... field lainnya sesuai struktur di services.ts
  ]
}
```

## Document ID Format

Setiap service akan di-create dengan ID: `service-{id}`

Contoh:
- `service-landing-page`
- `service-portfolio`
- `service-company-profile`
- dll

## Troubleshooting

### Error: "SANITY_AUTH_TOKEN is not set"
- Pastikan `.env` file sudah exist dan memiliki `SANITY_AUTH_TOKEN`
- Check bahwa token tidak kosong atau tidak expired

### Error: "Unauthorized"
- Token mungkin tidak memiliki permission yang cukup
- Buat token baru dengan scope yang tepat dari Sanity dashboard

### Error: "Invalid project ID"
- Pastikan `VITE_SANITY_PROJECT_ID` di `.env` sama dengan project ID Sanity Anda

### Documents tidak muncul di Sanity Studio
- Check dataset apakah sudah correct di `.env`
- Refresh browser Sanity Studio
- Cek apakah schema type `service` sudah dideploy

## Update Setelah Seed

Jika perlu update data:

1. Edit script di `scripts/seed-services.mjs` (ubah data dalam array `services`)
2. Jalankan ulang `npm run seed:services`
3. Script akan replace documents dengan ID yang sama

Atau gunakan opsi lain:
- Edit langsung di Sanity Studio
- Use Sanity CLI untuk import/export JSON

## Next Steps

Setelah seed berhasil:
1. Verifikasi data di Sanity Studio
2. Update query di app untuk fetch dari Sanity instead of local `services.ts`
3. Deploy schema jika belum

## Reference

- [Sanity Client Documentation](https://www.sanity.io/docs/client-libraries/js-client)
- [Sanity Auth Tokens](https://www.sanity.io/docs/auth-tokens)
- [Sanity GROQ Guide](https://www.sanity.io/docs/groq)
