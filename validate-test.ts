import { registerSchema, loginSchema, createProductSchema, createSupportSchema, getProductsQuerySchema, idParamSchema, updateUserRoleSchema } from './interface/validation/schemas'

async function run() {
  console.log('Testing registerSchema valid...')
  try {
    const ok = await registerSchema.parseAsync({ name: 'Juan', email: 'juan@example.com', password: 'secret123' })
    console.log('OK register:', ok)
  } catch (e) {
    console.error('ERR register valid:', e)
  }

  console.log('\nTesting registerSchema invalid (short name)...')
  try {
    await registerSchema.parseAsync({ name: 'J', email: 'bad', password: '1' })
    console.error('SHOULD HAVE FAILED')
  } catch (e) {
    console.log('Rejected as expected:', (e as any).errors?.map((x: any) => x.message))
  }

  console.log('\nTesting loginSchema invalid (missing email)...')
  try {
    await loginSchema.parseAsync({ password: '123' } as any)
    console.error('SHOULD HAVE FAILED')
  } catch (e) {
    console.log('Rejected as expected:', (e as any).errors?.map((x: any) => x.message))
  }

  console.log('\nTesting createProductSchema invalid (price not number)...')
  try {
    await createProductSchema.parseAsync({ name: 'Producto', price: -5 })
    console.error('SHOULD HAVE FAILED')
  } catch (e) {
    console.log('Rejected as expected:', (e as any).errors?.map((x: any) => x.message))
  }

  console.log('\nTesting createSupportSchema invalid (no message)...')
  try {
    await createSupportSchema.parseAsync({ name: 'Ana' } as any)
    console.error('SHOULD HAVE FAILED')
  } catch (e) {
    console.log('Rejected as expected:', (e as any).errors?.map((x: any) => x.message))
  }

  console.log('\nTesting getProductsQuerySchema parsing...')
  try {
    const q = await getProductsQuerySchema.parseAsync({ page: '2', limit: '5' } as any)
    console.log('Parsed query:', q)
  } catch (e) {
    console.error('ERR query parse:', e)
  }

  console.log('\nTesting idParamSchema invalid...')
  try {
    await idParamSchema.parseAsync({ id: '' })
    console.error('SHOULD HAVE FAILED')
  } catch (e) {
    console.log('Rejected as expected:', (e as any).errors?.map((x: any) => x.message))
  }

  console.log('\nTesting updateUserRoleSchema valid...')
  try {
    const ok = await updateUserRoleSchema.parseAsync({ role: 'admin' })
    console.log('OK role:', ok)
  } catch (e) {
    console.error('ERR role parse:', e)
  }
}

run().catch((e) => console.error(e))
