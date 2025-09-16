import { NavItem } from './navItem'

const navItems = [
  { href: '/', label: 'dock.home', icon: 'dock/home.svg' },
  { href: '/events', label: 'dock.events', icon: 'dock/events.svg' },
  { href: '/about', label: 'dock.about', icon: 'dock/about.svg' },
  { href: '/contact', label: 'dock.contact', icon: 'dock/contact.svg' },
]

export const NavItems = () => {
  return navItems.map((item) => {
    return <NavItem key={item.label} {...item} zIndex={navItems.length - navItems.indexOf(item)} />
  })
}
