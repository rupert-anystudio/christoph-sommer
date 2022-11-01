export default function Impressum() {
  return null
}

export async function getStaticProps({ preview = false }) {
  return {
    revalidate: 10,
    props: {
      preview,
    },
  }
}
