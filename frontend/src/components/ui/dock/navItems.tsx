import { NavItem } from './navItem'

const navItems = [
  { href: '/', label: 'home', icon: 'dock/home.svg' },
  { href: '/events', label: 'events', icon: 'dock/events.svg' },
  { href: '/about', label: 'about', icon: 'dock/about.svg' },
  { href: '/contact', label: 'contact', icon: 'dock/contact.svg' },
]

export const NavItems = () => {
  return navItems.map((item) => {
    return <NavItem key={item.label} {...item} />
  })
}
