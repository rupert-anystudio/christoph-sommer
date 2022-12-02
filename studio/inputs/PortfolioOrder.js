import React, { forwardRef } from 'react'
import styled from 'styled-components'
import FormField from 'part:@sanity/components/formfields/default'
// import { PatchEvent, set, unset } from 'part:@sanity/form-builder/patch-event'
import { withDocument } from 'part:@sanity/form-builder'
// import { useEditState } from '@sanity/react-hooks'
// import { Stack, Inline, Card, Checkbox, Text } from '@sanity/ui'
// import { useMachine } from '@xstate/react'
import { getSanityFormFieldProps } from './helpers'

const PrototypeFocusAreas = (props, ref) => {
  const { document, value: propsValue, onChange, onBlur, onFocus } = props

  return (
    <FormField {...getSanityFormFieldProps(props)}>
      {'PrototypeFocusAreas'}
    </FormField>
  )
}

export default withDocument(forwardRef(PrototypeFocusAreas))
