FROM node:20-alpine AS base

# Sadece gerektiğinde bağımlılıkları yükle
FROM base AS deps
# libc6-compat'in neden gerekebileceğini anlamak için https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine adresine bakın.
# Bu 
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Tercih edilen paket yöneticisine göre bağımlılıkları yükle
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile bulunamadı." && exit 1; \
    fi


# Kaynak kodunu sadece gerektiğinde yeniden derle
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js, genel kullanım hakkında tamamen anonim telemetri verileri toplar.
# Daha fazla bilgi için: https://nextjs.org/telemetry adresine bakın
# Derleme sırasında telemetriyi devre dışı bırakmak isterseniz, aşağıdaki satırın yorum işaretini kaldırın.
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build:prod; \
    else echo "Lockfile bulunamadı." && exit 1; \
    fi

# Üretim imajı, tüm dosyaları kopyala ve next'i çalıştır
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Çalışma zamanında telemetriyi devre dışı bırakmak isterseniz, aşağıdaki satırın yorum işaretini kaldırın.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Prerender önbelleği için doğru izinleri ayarla
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Otomatik olarak çıktı izlerini kullanarak imaj boyutunu azalt
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js, standalone çıktıdan next build tarafından oluşturulur
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js