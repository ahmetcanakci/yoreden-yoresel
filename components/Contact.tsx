import Link from "next/link";

export default function Contact() {
  return (
    <div className="contact">
      <h2 className="contact__title">Sorularınız için <span className="colored">İletişime geç.</span></h2>
      <p className="contact__paragraph">İletişime geçmek isterseniz her zaman ulaşabilirsiniz.</p>
      <a href="https://api.whatsapp.com/send?phone=905323969261&text=&source=&data=&app_absent=">
        <button>Bize Ulaşın</button>
      </a>
    </div>
  )
}