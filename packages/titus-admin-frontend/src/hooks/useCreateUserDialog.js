import { useMutation } from 'graphql-hooks'

import { CREATE_USER } from '../graphql'
import GraphQLError from '../GraphQLError'

import useDialog from './useDialog'
import useFields from './useFields'

export default function useCreateUserDialog(onConfirm) {
  const inputFields = useFields('UserInput')
  const userFields = useFields('User')
  const [createUser] = useMutation(CREATE_USER(userFields.all))

  const handleConfirm = async input => {
    const { error } = await createUser({ variables: { input } })

    if (error) {
      throw new GraphQLError(error)
    }

    onConfirm()
  }

  return useDialog({
    onConfirm: handleConfirm,
    title: 'Create user',
    text: 'Use this form to create a new user',
    action: 'Create',
    fields: inputFields.all.map(field => ({
      name: field,
      label: field,
      required: inputFields.metadata[field].required
    }))
  })
}
