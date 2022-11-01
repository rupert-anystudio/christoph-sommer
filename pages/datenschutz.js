export default function Datenschutz() {
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
