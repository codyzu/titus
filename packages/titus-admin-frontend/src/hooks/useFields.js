import useSchema from './useSchema'

export default function useFields(typeName) {
  const schema = useSchema(typeName)

  const strings = [
    ...(schema.fields || []),
    ...(schema.inputFields || [])
  ].filter(field =>
    [field.type.name, field.type.ofType?.name].some(t => ['String'].includes(t))
  )

  const id = (schema.fields || []).find(field =>
    [field.type.name, field.type.ofType?.name].some(t => t === 'ID')
  )

  const all = [id, ...strings].filter(Boolean)

  const metadata = all.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: {
        required: field.type.kind === 'NON_NULL'
      }
    }),
    {}
  )

  // description is either the first string field, if mandatory, or the id
  // this is to cope with auth0 which has a non-readable id field and a mandatory additional field
  // and with cognito which has a readable id field but possibly other, non-mandatory string fields
  const description =
    strings[0] && metadata[strings[0].name].required ? strings[0] : id

  const fields = {
    id: id?.name,
    description: description?.name,
    all: all.map(f => f.name),
    metadata
  }

  return fields
}
