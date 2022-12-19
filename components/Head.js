import NextHead from 'next/head'
import usePagePropsContext from '../hooks/usePagePropsContext'

const Head = () => {
  const { page } = usePagePropsContext()
  const title = ['Über Tourismus', page?.title].filter(Boolean).join(' - ')
  return (
    <NextHead>
      <title>{title}</title>
    </NextHead>
  )
}

export default Head
