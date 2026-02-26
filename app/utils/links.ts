import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: 'ראשי',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: 'פרויקטים',
  icon: 'i-lucide-folder',
  to: '/projects'
}, {
  label: 'אודות',
  icon: 'i-lucide-user',
  to: '/about'
}]
