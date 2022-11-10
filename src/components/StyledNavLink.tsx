import { NavLink } from 'react-router-dom'
const activeClassName = 'link link--active'
const className = 'link link--unactive'


type IStyledNavLinkProps =  React.PropsWithChildren<{ to: string }>;
const StyledNavLink = ({to}:IStyledNavLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? activeClassName : className)}>
      Home
    </NavLink>
  )
}

export default StyledNavLink