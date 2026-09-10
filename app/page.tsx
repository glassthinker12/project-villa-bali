import { HeroGallery } from "@/components/hero-thumbs"
import { Button } from "@/components/ui/button"

const IMG = "/figma/images"
const ICON = "/figma/icons"

const heroThumbs = [
  `${IMG}/hero-thumb-1.png`,
  `${IMG}/hero-thumb-2.png`,
  `${IMG}/hero-thumb-3.png`,
  `${IMG}/hero-thumb-4.png`,
  `${IMG}/hero-thumb-5.png`,
]

const villas = [
  {
    name: "Villa Sofia",
    price: "Rp3.178.300",
    image: `${IMG}/villa-sofia.png`,
    frameWidth: "w-[152px]",
  },
  {
    name: "Villa Cara",
    price: "Rp4.449.619",
    image: `${IMG}/villa-cara.png`,
    frameWidth: "w-[156px]",
  },
  {
    name: "Villa Chloe",
    price: "Rp4.449.619",
    image: `${IMG}/villa-chloe.png`,
    frameWidth: "w-[156px]",
  },
]


function Navbar() {
  return (
    <nav className="absolute top-0 right-0 left-0 z-10 mx-auto flex w-full max-w-[440px] items-center justify-between p-4">
      <img
        alt="Seaview Private Villas"
        src={`${IMG}/logo.png`}
        className="h-12 w-[136px] object-cover"
      />
      <img alt="Open menu" src={`${ICON}/list.svg`} className="size-6" />
    </nav>
  )
}

function HeroSection() {
  return (
    <HeroGallery cover={`${IMG}/hero-bg.png`} thumbs={heroThumbs}>
      <div className="flex w-full flex-col gap-16">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-1">
              <p className="font-subheading text-base leading-[26px] font-bold text-white">
                5.0
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <img
                    key={i}
                    alt=""
                    src={`${ICON}/star.svg`}
                    className="size-4"
                  />
                ))}
              </div>
              <p className="text-xs leading-5 text-white underline">
                from Google Reviews
              </p>
            </div>
            <h1 className="font-heading text-[52px] leading-[56px] sm:text-[60px] sm:leading-[64px] font-bold text-white break-words">
              Experience The Luxury
            </h1>
          </div>
          <p className="w-full text-base leading-[26px] text-white">
            Seaview, the heaven in Nusa Lembongan, Bali. Feel effortless
            journey from the first enquiry to checkout
          </p>
        </div>
        <Button variant="paper" size="xl">
          See Our Villas
          <img
            alt=""
            src={`${ICON}/arrow-right-brand.svg`}
            className="size-6"
          />
        </Button>
      </div>
    </HeroGallery>
  )
}

function AboutSection() {
  return (
    <section className="relative w-full max-w-[440px] overflow-hidden pb-16">
      <div className="absolute inset-x-0 top-0 h-[606px] overflow-hidden bg-sky">
        <div className="absolute top-[calc(50%+0.5px)] left-1/2 h-[107px] w-full max-w-[321px] -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-20">
          <img
            alt=""
            src={`${IMG}/about-watermark.png`}
            className="absolute top-[-842.86%] left-[-146.67%] h-[1542.86%] w-[514.29%] max-w-none"
          />
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center justify-center gap-8 px-4 pt-16 pb-4">
          <div className="flex w-full flex-col items-center gap-2 text-center">
            <p className="font-subheading text-base leading-[26px] text-brand">
              SEAVIEW PRIVATE VILLAS, NUSA LEMBONGAN
            </p>
            <h2 className="w-full font-heading text-4xl leading-[44px] font-bold text-ink">
              More than just a villa for vacation
            </h2>
            <p className="w-full text-sm leading-[22px] text-mist">
              As the only villa with access to a private beach cave on the
              island, Seaview Private Villas offers a unique experience for
              families, couples or groups, seeking a memorable and affordable
              stay.
            </p>
          </div>
          <Button variant="brand" size="xl">
            Read Our Story
            <img
              alt=""
              src={`${ICON}/arrow-right-white.svg`}
              className="size-6"
            />
          </Button>
        </div>
        <div className="w-full px-4">
          <div className="relative mx-auto aspect-[343/440] w-full max-w-[408px] overflow-hidden">
            <div className="absolute inset-[0_1.8%_1.64%_0]">
              <img
                alt="Seaview Private Villas"
                src={`${IMG}/about-image.png`}
                className="size-full object-cover"
              />
            </div>
            <div className="absolute inset-[1.64%_0_0_1.8%] border-[1.5px] border-taupe" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Spec({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1">
      <img alt="" src={icon} className="size-6 shrink-0" />
      <p className="truncate text-center text-xs sm:text-sm leading-[22px] text-ink">
        {label}
      </p>
    </div>
  )
}

function VillaCard({
  name,
  price,
  image,
  frameWidth,
}: {
  name: string
  price: string
  image: string
  frameWidth: string
}) {
  return (
    <article className="flex w-full flex-col gap-4">
      <div className="relative h-[247px] w-full overflow-hidden">
        <img
          alt={name}
          src={image}
          className="absolute top-0 left-0 h-[209px] w-full object-cover"
        />
        <div className="absolute top-[171px] inset-x-0 flex w-full items-end justify-between">
          <h3 className="text-center font-heading text-2xl leading-8 font-bold whitespace-nowrap text-olive">
            {name}
          </h3>
          <div
            className={`relative h-[76px] shrink-0 border border-olive ${frameWidth}`}
          >
            <div className="absolute top-1/2 left-[7px] flex -translate-y-1/2 flex-col items-start justify-center overflow-hidden bg-cream p-2 text-center whitespace-nowrap shadow-[8px_8px_20px_10px_rgba(45,45,45,0.15)]">
              <p className="text-[10px] leading-4 font-medium text-mist">
                Starting from
              </p>
              <p className="font-subheading text-xl leading-7 font-bold text-ink">
                {price}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <Spec icon={`${ICON}/user.svg`} label="2 Guests" />
        <div className="size-2 shrink-0 rotate-45 bg-olive" />
        <Spec icon={`${ICON}/bed.svg`} label="1 Bedroom" />
        <div className="size-2 shrink-0 rotate-45 bg-olive" />
        <Spec icon={`${ICON}/bathtub.svg`} label="1 Bathroom" />
      </div>
      <Button variant="outline-ink" size="xl">
        See Villa Details
        <img alt="" src={`${ICON}/arrow-right-ink.svg`} className="size-6" />
      </Button>
    </article>
  )
}

function VillaSection() {
  return (
    <section className="flex w-full items-center justify-center bg-cream px-4 py-16">
      <div className="flex w-full max-w-[440px] flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <p className="font-subheading text-base leading-[26px] whitespace-nowrap text-brand">
              VILLAS OVERVIEW
            </p>
            <Button
              variant="ghost"
              size="pill"
              className="text-brand hover:bg-transparent"
            >
              See All Villas
              <img
                alt=""
                src={`${ICON}/arrow-right-sm.svg`}
                className="size-4"
              />
            </Button>
          </div>
          <h2 className="w-full font-heading text-4xl leading-[44px] font-bold text-ink">
            Our Luxury Villa
          </h2>
        </div>
        {villas.map((villa) => (
          <VillaCard key={villa.name} {...villa} />
        ))}
      </div>
    </section>
  )
}

function GallerySection() {
  return (
    <section className="relative w-full max-w-[440px] overflow-hidden">
      {/* Top Part: Villas Gallery */}
      <div className="relative pb-10">
        <div className="absolute top-0 inset-x-0 h-[512px] w-full overflow-hidden">
          <img
            alt=""
            src={`${IMG}/gallery-bg.png`}
            className="size-full object-cover"
          />
          <div className="absolute top-0 inset-x-0 h-[487px] w-full bg-[linear-gradient(180.02deg,rgba(36,33,33,0.6)_0%,rgba(36,33,33,0.7)_99.986%)]" />
        </div>
        <div className="relative pt-16 flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex w-full max-w-[440px] px-4 flex-col items-center gap-2 text-center">
              <p className="font-subheading text-base leading-[26px] whitespace-nowrap text-brand-soft">
                VILLAS GALLERY
              </p>
              <h2 className="w-full font-heading text-4xl leading-[44px] font-bold text-paper">
                A Glimpse of Seaview Private Villas
              </h2>
            </div>
            <div className="relative h-[419px] w-full max-w-[440px] overflow-hidden">
              <div className="absolute top-14 left-[calc(50%+161px)] h-[307px] w-[239px] -translate-x-1/2 overflow-hidden opacity-50">
                <img
                  alt=""
                  src={`${IMG}/gallery-right.png`}
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute top-14 left-[calc(50%-160px)] h-[307px] w-[239px] -translate-x-1/2 overflow-hidden opacity-50">
                <img
                  alt=""
                  src={`${IMG}/gallery-left.png`}
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute top-0 left-1/2 h-[419px] w-[calc(100%-48px)] max-w-[327px] -translate-x-1/2 overflow-hidden">
                <div className="absolute inset-[0_1.8%_1.64%_0]">
                  <img
                    alt=""
                    src={`${IMG}/gallery-center.png`}
                    className="size-full object-cover"
                  />
                </div>
                <div className="absolute inset-[1.64%_0_0_1.8%] border-[1.5px] border-taupe" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="size-3 bg-brand" />
            <div className="size-2 bg-brand-light" />
            <div className="size-2 bg-brand-light" />
            <div className="size-2 bg-brand-light" />
          </div>
        </div>
      </div>

      {/* Bottom Part: Beach Cave Access */}
      <div className="w-full px-4 py-8">
        <div className="flex w-full max-w-[440px] flex-col gap-8">
          <div className="flex w-full flex-col items-center gap-2 text-center">
            <p className="font-subheading text-base leading-[26px] whitespace-nowrap text-brand">
              OUR UNIQUE EXPERIENCES
            </p>
            <h2 className="w-full font-heading text-4xl leading-[44px] font-bold text-ink">
              The Private Beach Cave Access
            </h2>
          </div>
          <div className="flex w-full flex-col gap-4">
            <img
              alt=""
              src={`${IMG}/cave-1.png`}
              className="aspect-[343/217] w-full shrink-0 object-cover"
            />
            <img
              alt=""
              src={`${IMG}/cave-2.png`}
              className="aspect-[343/217] w-full shrink-0 object-cover"
            />
            <img
              alt=""
              src={`${IMG}/cave-3.png`}
              className="aspect-[343/217] w-full shrink-0 object-cover"
            />
          </div>
          <Button variant="outline-brand" size="xl">
            See All Gallery
            <img
              alt=""
              src={`${ICON}/arrow-right-brand.svg`}
              className="size-6"
            />
          </Button>
        </div>
      </div>
    </section>
  )
}

function FooterContact({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex w-full items-center justify-center gap-2 px-2 py-1">
      <img alt="" src={icon} className="size-5 shrink-0" />
      <p className="text-center text-xs leading-5 text-paper break-all sm:break-normal">
        {text}
      </p>
    </div>
  )
}

function FooterSection() {
  return (
    <footer className="flex w-full items-center justify-center bg-brand px-4 pt-16 pb-4">
      <div className="flex w-full max-w-[440px] flex-col items-center gap-8 border border-brand-light bg-brand p-4">
        <img
          alt="Seaview Private Villas"
          src={`${IMG}/logo.png`}
          className="h-[106px] w-full max-w-[300px] object-contain"
        />
        <div className="flex w-full flex-col gap-8">
          <h2 className="w-full text-center font-heading text-2xl leading-8 font-bold text-paper">
            Let&apos;s craft a stay worth remembering
          </h2>
          <Button variant="paper" size="xl">
            Save Your Stay Now
            <img
              alt=""
              src={`${ICON}/arrow-right-brand.svg`}
              className="size-6"
            />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4 text-center text-white">
          <p className="font-heading text-2xl leading-8 font-bold">
            Navigation
          </p>
          <div className="flex flex-col items-center gap-4 text-base leading-[26px] font-medium">
            <p>Home</p>
            <p>About Us</p>
            <p>Villas Highlight</p>
            <p>The Cave Highlights</p>
            <p>Experiences/Local Guide</p>
            <p>Gallery</p>
            <p>Contact Us</p>
          </div>
        </div>
        <img alt="" src={`${ICON}/divider.svg`} className="h-[2px] w-full" />
        <p className="w-full text-center text-xs leading-5 text-white">
          Tamarind Road, Jungutbatu, Kec. Nusa Penida, Kabupaten Klungkung,
          Bali, Indonesia
        </p>
        <div className="flex w-full flex-col items-center gap-4">
          <FooterContact
            icon={`${ICON}/envelope.svg`}
            text="info@seaviewprivatevillas.com"
          />
          <FooterContact
            icon={`${ICON}/instagram.svg`}
            text="Seaview Private Villas"
          />
          <FooterContact
            icon={`${ICON}/facebook.svg`}
            text="Seaview Private Villas"
          />
        </div>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <div className="min-h-svh bg-neutral-100">
      <div className="relative mx-auto w-full max-w-[440px] bg-white shadow-xl overflow-x-clip">
        <main className="relative w-full max-w-[440px]">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <VillaSection />
          <GallerySection />
          <FooterSection />
        </main>
      </div>
    </div>
  )
}
