let output = ''
async function main () {
  const dynamic = await import('./data')
  output = dynamic.default + '🦁'
}
main()
// const dynamic = import('./data')
// output = (await dynamic).default + ' 🦁 ' + Math.random() * 100
export { output }