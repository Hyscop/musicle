import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | Müzikle",
  description: "Müzikle kullanım koşulları ve hizmet şartları",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-6 sm:px-8 py-12 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          ← Ana Sayfaya Dön
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Kullanım Koşulları
        </h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-gray-300 text-lg">
            Son güncellenme: {new Date().toLocaleDateString("tr-TR")}
          </p>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              1. Hizmet Şartlarının Kabulü
            </h2>
            <p className="text-gray-300">
              Müzikle&apos;ye (&quot;Site&quot;, &quot;biz&quot; veya
              &quot;hizmet&quot;) erişerek veya siteyi kullanarak, bu kullanım
              koşullarını kabul etmiş olursunuz. Eğer bu şartları kabul
              etmiyorsanız, lütfen siteyi kullanmayın.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              2. Hizmet Tanımı
            </h2>
            <p className="text-gray-300 mb-4">
              Müzikle, kullanıcıların günlük olarak müzik tahmin oyunu
              oynayabildiği ücretsiz bir web platformudur. Hizmetimiz şunları
              içerir:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Günlük müzik tahmin oyunu</li>
              <li>Farklı müzik kategorileri (Rock, Hip Hop, Tümü)</li>
              <li>İlerleme takibi ve istatistikler</li>
              <li>Ücretsiz erişim</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              3. Kullanıcı Sorumlulukları
            </h2>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              3.1. Kabul Edilebilir Kullanım
            </h3>
            <p className="text-gray-300 mb-4">
              Siteyi kullanırken şunları YAPMAYI kabul edersiniz:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Yasalara ve düzenlemelere uygun kullanım</li>
              <li>Diğer kullanıcılara saygılı davranma</li>
              <li>Kişisel kullanım için erişim</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              3.2. Yasak Faaliyetler
            </h3>
            <p className="text-gray-300 mb-4">Şunları YAPMAMALISINIZ:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Siteyi otomatik araçlarla (bot, scraper) kullanmak</li>
              <li>Hizmeti kötüye kullanmak veya manipüle etmek</li>
              <li>Zararlı kod, virüs veya malware yüklemek</li>
              <li>İçeriği izinsiz kopyalamak veya dağıtmak</li>
              <li>Aşırı yük oluşturacak şekilde API&apos;yi kullanmak</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              4. Fikri Mülkiyet Hakları
            </h2>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              4.1. Site İçeriği
            </h3>
            <p className="text-gray-300 mb-4">
              Site tasarımı, logo, kod ve diğer tüm içerik Müzikle&apos;nin veya
              lisans sahiplerinin mülkiyetindedir ve telif hakkı yasaları ile
              korunmaktadır.
            </p>

            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              4.2. Müzik İçeriği
            </h3>
            <p className="text-gray-300">
              Sitede kullanılan müzik içeriği YouTube API aracılığıyla
              sağlanmaktadır. Tüm müzik içeriğinin telif hakları ilgili sanatçı
              ve plak şirketlerine aittir. Biz sadece YouTube&apos;un
              API&apos;sini kullanarak halka açık içeriği oyunumuzda
              kullanıyoruz.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              5. Üçüncü Taraf Hizmetler
            </h2>
            <p className="text-gray-300 mb-4">
              Sitemiz aşağıdaki üçüncü taraf hizmetlerini kullanır:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <strong>YouTube API:</strong> YouTube&apos;un Kullanım
                Şartları&apos;na tabidir
              </li>
              <li>
                <strong>Vercel:</strong> Hosting ve analitik hizmetleri
              </li>
            </ul>
            <p className="text-gray-300 mt-4">
              Bu hizmetlerin kullanımı kendi şartlarına tabidir ve biz bu üçüncü
              taraf hizmetlerden sorumlu değiliz.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              6. Hizmet Garantisi ve Sorumluluk Reddi
            </h2>
            <p className="text-gray-300 mb-4">
              Hizmetimiz &quot;OLDUĞU GİBİ&quot; ve &quot;MEVCUT OLDUĞU
              ŞEKLİYLE&quot; sunulmaktadır:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Hizmetin kesintisiz olacağını garanti etmiyoruz</li>
              <li>Teknik hatalardan sorumlu değiliz</li>
              <li>İçeriğin doğruluğunu garanti etmiyoruz</li>
              <li>
                Hizmetin her zaman kullanılabilir olacağını garanti etmiyoruz
              </li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              7. Sorumluluk Sınırlaması
            </h2>
            <p className="text-gray-300">
              Yasaların izin verdiği ölçüde, Müzikle ve sahipleri, hizmetin
              kullanımından veya kullanılamamasından kaynaklanan hiçbir
              doğrudan, dolaylı, arızi, özel veya sonuç olarak ortaya çıkan
              zarardan sorumlu tutulamaz.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              8. Hizmet Değişiklikleri ve Sonlandırma
            </h2>
            <p className="text-gray-300 mb-4">Biz aşağıdaki haklara sahibiz:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                Hizmeti önceden haber vermeden değiştirme veya sonlandırma
              </li>
              <li>Kullanıcı hesaplarını askıya alma veya sonlandırma</li>
              <li>İçeriği güncelleme veya kaldırma</li>
              <li>Bu kullanım koşullarını değiştirme</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              9. Veri ve Gizlilik
            </h2>
            <p className="text-gray-300">
              Kişisel verilerinizin nasıl işlendiği hakkında bilgi için{" "}
              <Link
                href="/privacy"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Gizlilik Politikamızı
              </Link>{" "}
              okuyun.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              10. Uygulanacak Hukuk
            </h2>
            <p className="text-gray-300">
              Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir.
              Herhangi bir anlaşmazlık durumunda Türkiye mahkemeleri yetkilidir.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              11. İletişim
            </h2>
            <p className="text-gray-300 mb-4">
              Kullanım koşulları hakkında sorularınız için:
            </p>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong>E-posta:</strong>{" "}
                <a
                  href="mailto:hello@hyscop.com"
                  className="text-purple-400 hover:text-purple-300"
                >
                  mehmetduman.dev@gmail.com
                </a>
              </p>
              <p>
                <strong>Web:</strong>{" "}
                <a
                  href="https://www.hyscop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  hyscop.com
                </a>
              </p>
              <p>
                <strong>Twitter:</strong>{" "}
                <a
                  href="https://x.com/hyscopp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  @hyscopp
                </a>
              </p>
            </div>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              12. Şartların Kabulü
            </h2>
            <p className="text-gray-300">
              Siteyi kullanmaya devam ederek, bu kullanım koşullarını
              okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  );
}
