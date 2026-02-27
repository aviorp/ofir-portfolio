export default defineAppConfig({
  global: {
    picture: {
      dark: '/ofir.png',
      light: '/ofir.png',
      alt: 'אופיר מירזנדה'
    },
    meetingLink: 'https://wa.link/vxysq6',
    email: 'ofir4215@gmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `© ${new Date().getFullYear()} אופיר מירזנדה — כל הזכויות שמורות`,
    colorMode: false,
    links: []
  }
})
