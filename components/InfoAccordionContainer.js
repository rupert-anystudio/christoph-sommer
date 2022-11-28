import InfoAccordion from './InfoAccordion'
import useInfoAccordion from '../hooks/useInfoAccordion'

const InfoAccordionContainer = () => {
  const { blocks, rootProps } = useInfoAccordion()
  return <InfoAccordion blocks={blocks} rootProps={rootProps} />
}

export default InfoAccordionContainer
