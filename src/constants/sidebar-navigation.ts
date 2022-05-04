import { CgLogIn, CgLogOut } from 'react-icons/cg'
import { RiDashboardLine, RiShoppingBag3Line } from 'react-icons/ri'

export default {
  Dashboard: {
    icon: RiDashboardLine,
    link: '/app/dashboard',
  },
  Produtos: {
    icon: RiShoppingBag3Line,
    link: '/app/products',
  },
  Entradas: {
    icon: CgLogIn,
    link: '/app/entries',
  },
  Saídas: {
    icon: CgLogOut,
    link: '/app/outs',
  },
} as const
