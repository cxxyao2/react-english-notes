import * as React from 'react'
import { NavLink as BaseNavLink } from 'react-router-dom'

type IProps = React.PropsWithChildren<{
  to: string
  className: string
  activeClassName: string
  activeStyle?: { [name: string]: any }
  style?: { [name: string]: any }
}>

const MyNavLink = React.forwardRef(
  (
    { activeClassName, activeStyle, ...props }: IProps,
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [props.className, isActive ? activeClassName : null]
            .filter(Boolean)
            .join(' ')
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null)
        })}
      />
    )
  }
)

export default MyNavLink
