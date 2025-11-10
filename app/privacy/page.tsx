import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Müzikle",
  description: "Müzikle gizlilik politikası ve kişisel verilerin korunması",
};

export default function PrivacyPage() {
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
          Gizlilik Politikası
        </h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-gray-300 text-lg">
            Son güncellenme: {new Date().toLocaleDateString("tr-TR")}
          </p>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              1. Genel Bilgiler
            </h2>
            <p className="text-gray-300">
              Müzikle (&quot;biz&quot;, &quot;bizim&quot; veya
              &quot;site&quot;), kullanıcılarının gizliliğine önem verir. Bu
              gizlilik politikası, siteyi kullanırken hangi bilgilerin
              toplandığını, nasıl kullanıldığını ve korunduğunu açıklar.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              2. Toplanan Bilgiler
            </h2>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              2.1. Otomatik Toplanan Bilgiler
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Tarayıcı türü ve versiyonu</li>
              <li>İşletim sistemi</li>
              <li>IP adresi (anonim)</li>
              <li>Ziyaret tarihi ve saati</li>
              <li>Oyun istatistikleri (kazanma oranı, tahmin sayısı)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              2.2. Yerel Depolama (Local Storage)
            </h3>
            <p className="text-gray-300">
              Oyun ilerlemenizi kaydetmek için tarayıcınızın yerel deposunu
              kullanırız. Bu veriler sadece cihazınızda saklanır ve
              sunucularımıza gönderilmez:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
              <li>Günlük oyun ilerlemeniz</li>
              <li>Tahminleriniz</li>
              <li>Hangi kategorileri tamamladığınız</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              3. Bilgilerin Kullanımı
            </h2>
            <p className="text-gray-300 mb-4">
              Topladığımız bilgileri şu amaçlarla kullanırız:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Oyun deneyiminizi iyileştirmek</li>
              <li>Teknik sorunları tespit etmek ve çözmek</li>
              <li>İstatistiksel analiz yapmak</li>
              <li>Site performansını optimize etmek</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              4. Çerezler (Cookies)
            </h2>
            <p className="text-gray-300 mb-4">
              Sitemiz, kullanıcı deneyimini geliştirmek için çerezler kullanır:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <strong>Zorunlu Çerezler:</strong> Sitenin çalışması için
                gereklidir
              </li>
              <li>
                <strong>Analitik Çerezler:</strong> Anonim kullanım
                istatistikleri toplar
              </li>
            </ul>
            <p className="text-gray-300 mt-4">
              Tarayıcı ayarlarınızdan çerezleri yönetebilir veya
              reddedebilirsiniz.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              5. Üçüncü Taraf Hizmetler
            </h2>
            <p className="text-gray-300 mb-4">
              Sitemizde kullanılan üçüncü taraf hizmetler:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <strong>YouTube API:</strong> Müzik çalmak için (Google Gizlilik
                Politikası uygulanır)
              </li>
              <li>
                <strong>Vercel Analytics:</strong> Anonim kullanım
                istatistikleri
              </li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              6. Veri Güvenliği
            </h2>
            <p className="text-gray-300">
              Verilerinizin güvenliği bizim için önemlidir. HTTPS şifrelemesi
              kullanarak verilerinizi koruruz. Ancak, internet üzerinden hiçbir
              veri aktarım yöntemi %100 güvenli değildir.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              7. Çocukların Gizliliği
            </h2>
            <p className="text-gray-300">
              Sitemiz 13 yaş altı çocuklardan bilerek kişisel bilgi toplamaz.
              Eğer bir ebeveyn veya vasiyseniz ve çocuğunuzun bize kişisel bilgi
              verdiğini düşünüyorsanız, lütfen bizimle iletişime geçin.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              8. Haklarınız
            </h2>
            <p className="text-gray-300 mb-4">KVKK kapsamında haklarınız:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse bilgi talep etme</li>
              <li>Verilerin düzeltilmesini isteme</li>
              <li>Verilerin silinmesini talep etme</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              9. Değişiklikler
            </h2>
            <p className="text-gray-300">
              Bu gizlilik politikasını zaman zaman güncelleyebiliriz.
              Değişiklikler bu sayfada yayınlanacaktır. Önemli değişiklikler
              için kullanıcıları bilgilendireceğiz.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              10. İletişim
            </h2>
            <p className="text-gray-300 mb-4">
              Gizlilik politikamız hakkında sorularınız varsa:
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
