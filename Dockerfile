FROM node:20-alpine AS base

# Sadece gerektiğinde bağımlılıkları yükle
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Corepack kullanmadan pnpm'i yükle
RUN npm install -g pnpm --ignore-scripts

# Tercih edilen paket yöneticisine göre bağımlılıkları yükle
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
    else echo "Lockfile bulunamadı." && exit 1; \
    fi


# Kaynak kodunu sadece gerektiğinde yeniden derle
FROM base AS builder
WORKDIR /app

# Corepack kullanmadan pnpm'i yükle
RUN npm install -g pnpm --ignore-scripts

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js, genel kullanım hakkında tamamen anonim telemetri verileri toplar.
# Daha fazla bilgi için: https://nextjs.org/telemetry adresine bakın
# Derleme sırasında telemetriyi devre dışı bırakmak isterseniz, aşağıdaki satırın yorum işaretini kaldırın.
ENV NEXT_TELEMETRY_DISABLED=1

RUN \
    if [ -f yarn.lock ]; then yarn run build:prod; \
    elif [ -f package-lock.json ]; then npm run build:prod; \
    elif [ -f pnpm-lock.yaml ]; then pnpm run build:prod; \
    else echo "Lockfile bulunamadı." && exit 1; \
    fi

# Üretim imajı
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Prerender önbelleği için doğru izinleri ayarla
RUN mkdir .next \
&& chown nextjs:nodejs .next

# Otomatik olarak çıktı izlerini kullanarak imaj boyutunu azalt
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
