export type EventPartner = {
  name: string
  displayName?: string
  tier: string
  logo: string
  link?: string
  imageClassName?: string
}

const imagePath = (filename: string) =>
  `${import.meta.env.BASE_URL}images/Partner Logos/${filename}`

export const EVENT_PARTNERS: readonly EventPartner[] = [
  {
    name: 'Wealthsimple',
    tier: 'Silver',
    logo: imagePath('wealthsimpleLogo.png'),
  },
  {
    name: 'Microsoft',
    tier: 'Silver',
    logo: imagePath('Microsoft_logo.webp'),
  },
  {
    name: 'AMD',
    tier: 'Silver',
    logo: imagePath('amd_logo.png'),
  },
  {
    name: 'Pfizer',
    tier: 'Silver',
    logo: imagePath('Pfizer_(2021).svg'),
  },
  {
    name: 'IBM',
    tier: 'Silver',
    logo: imagePath('IBM_logo.svg.webp'),
  },
  {
    name: 'TCS',
    displayName: 'Tata Consultancy Services',
    tier: 'Silver',
    logo: imagePath('tcs_logo.webp'),
  },
  {
    name: 'Manulife',
    tier: 'Silver',
    logo: imagePath('Manulife_logo.svg.webp'),
  },
  {
    name: 'Faculty of Science',
    tier: 'Gold',
    logo: imagePath('TMU_logo.png'),
    link: 'https://www.torontomu.ca/science/',
  },
  {
    name: "Toronto Metropolitan Students' Union",
    displayName: 'TMSU',
    tier: 'Gold',
    logo: imagePath('TMSU.jpg'),
    imageClassName: 'rounded-xl',
  },
  {
    name: 'Undergraduate Science Society of TMU',
    displayName: 'USSTM',
    tier: 'Title',
    logo: imagePath('usstm logo.png'),
    imageClassName: 'rounded-lg',
    link: 'https://usstm.ca/',
  },
  {
    name: 'Slalom',
    tier: 'Silver',
    logo: imagePath('slalom-logo-blue.png'),
    link: 'https://www.slalom.com/ca/en',
  },
  { name: 'Shopify', tier: 'Silver', logo: imagePath('shopify.svg') },
  {
    name: 'Backboard.ai',
    tier: 'Silver',
    logo: imagePath('backboard_io_logo.jpg'),
    imageClassName: 'rounded-xl',
  },
  {
    name: 'AI Collective',
    tier: 'Silver',
    logo: imagePath('aicollective.jpg'),
    imageClassName: 'rounded-xl',
  },
  {
    name: 'DMZ',
    tier: 'Bronze',
    logo: imagePath('DMZ.jpg'),
    imageClassName: 'rounded-xl',
    link: 'https://www.instagram.com/dmzhq/',
  },
  {
    name: 'Nodalli',
    tier: 'Bronze',
    logo: imagePath('nodalli.png'),
    imageClassName: 'rounded-xl',
    link: 'https://nodalli.com',
  },
  {
    name: 'Poulet Rouge',
    tier: 'Bronze',
    logo: imagePath('Poulet Rouge.png'),
  },
  {
    name: 'BeaverKeys',
    tier: 'Bronze',
    logo: imagePath('BeaverKey.jpg'),
    link: 'https://beaverkeys.ca',
  },
  {
    name: 'Avznailz',
    tier: 'Bronze',
    logo: imagePath('Avz_nails.jpeg'),
    imageClassName: 'rounded-xl',
    link: 'https://www.instagram.com/avznailz',
  },
  {
    name: 'Zone Learning',
    displayName: 'TMU Zone Learning',
    tier: 'Bronze',
    logo: imagePath('TMU_logo.png'),
    link: 'https://www.torontomu.ca/zone-learning/',
  },
  {
    name: 'Ametros Learning',
    tier: 'Silver',
    logo: imagePath('Ametros-Primary_Colour_Dark - James White.png'),
    imageClassName: 'rounded-xl',
    link: 'https://www.ametroslearning.com/',
  },
  {
    name: 'ReShape',
    tier: 'Bronze+',
    logo: imagePath('reshape.png'),
    imageClassName: 'rounded-xl',
    link: 'https://www.reshapeapp.ai',
  },
  {
    name: '18feet',
    tier: 'Bronze',
    logo: imagePath('18feet.png'),
    imageClassName: 'rounded-xl',
    link: 'https://www.18feet.ca',
  },
  {
    name: 'Matcha Moments',
    tier: 'Bronze+',
    logo: imagePath('matchamoments.png'),
    imageClassName: 'rounded-xl',
    link: 'https://www.popuppearl.ca/matchamoments',
  },
  {
    name: 'Meex',
    tier: 'Bronze+',
    logo: imagePath('meex_logo.png'),
    imageClassName: 'rounded-xl',
    link: 'https://meex.co/',
  },
  {
    name: 'MetPack',
    tier: 'Bronze',
    logo: imagePath('metpack.png'),
    imageClassName: 'rounded-xl',
    link: 'https://www.tmumetpack.com/',
  },
  {
    name: 'Career & Co-op Centre',
    tier: 'Bronze',
    logo: imagePath('career and co-op TMU.jpg'),
    imageClassName: 'rounded-lg',
  },
]
