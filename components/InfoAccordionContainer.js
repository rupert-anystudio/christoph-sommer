import InfoAccordion from './InfoAccordion'
import useAnimatedInfoAccordion from '../hooks/useAnimatedInfoAccordion'

const InfoAccordionContainer = () => {
  const props = useAnimatedInfoAccordion()
  return <InfoAccordion {...props} />
}

export default InfoAccordionContainer
