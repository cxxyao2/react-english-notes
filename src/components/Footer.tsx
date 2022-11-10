const COLORS = {
  text: 'black',
  background: 'white',
  primary: 'rebeccapurple'
}

const Footer = () => {
  return (
    <footer
      className='text-center w-100'
      style={{
        backgroundColor: 'var(--bs-gray-200)',
        color: 'var(--bs-gray-800)'
      }}>
      Jennifer&copy;2022. All right reserved.
    </footer>
  )
}

export default Footer
