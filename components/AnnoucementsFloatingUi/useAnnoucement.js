import usePagePropsContext from '../../hooks/usePagePropsContext'

export const useAnnoucement = () => {
  const pageProps = usePagePropsContext()
  const annoucements = pageProps?.annoucements ?? []
  const annoucement = annoucements[0] || {}
  const amount = annoucements.length
  return [annoucement, amount]
}
