import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './'
})

const config: Config = {
  preset: 'ts-jest', // Bu default olarak typescript dosyalarını test eder
  verbose: true, // verbose'yi true yaparak testlerin detaylarını görebiliriz
  clearMocks: true, // Her test çalıştığında mockları temizler
  maxWorkers: 1, // Testlerin kaç işçi ile çalışacağını belirler
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup-react-tests.ts'], // Testlerin çalıştığı ortamı belirler
  roots: ['src/'], // Testlerin çalıştığı klasörü belirler
  modulePaths: ['<rootDir>/'], // Modüllerin nerede olduğunu belirler
  moduleDirectories: ['node_modules', '<rootDir>/'], // Modüllerin nerede olduğunu belirler
  moduleFileExtensions: ['js', 'json', 'ts', 'jsx', 'tsx', 'node'], // Modül dosya uzantılarını belirler
  testEnvironment: 'jsdom', // Testlerin çalıştığı ortamı belirler jsdom: browser ortamı, node: node.js ortamı
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/out/', '<rootDir>/public/'], // Test edilmeyecek dosyaları belirler
  transform: {
    '^.+\\.(ts|js)x$': [
      // Test edilecek dosyaların dönüştürme işlemlerini belirler
      'ts-jest', // typescript dosyalarını test eder
      { tsconfig: 'tsconfig.json', isolatedModules: true } // tsconfig.json dosyasını kullanarak test eder isolatedModules: true ile modülleri izole eder yani birbirinden bağımsız test eder
    ]
  },
  coverageProvider: 'v8', // Test kapsamını belirler
  testMatch: ['**/*.test.ts', '**/*.test.tsx'] // Test edilecek dosyaları belirler
}

export default createJestConfig(config)
