export function getMessageOfError(error: unknown) {
  let errorMessage = 'Error From Server'
  const errorProps = Object.getOwnPropertyNames(error)

  if (errorProps.includes('message')) {
    errorMessage += ' : ' + (error as any).message
  }
  return errorMessage
}

export function downloadJson(){
  let data = JSON.stringify({weather:{is_sunny:true, temperature:23}})
  let dataUri= 'data:application/json;charset=utf-8,' + encodeURIComponent(data)
  let exportFileName='weather.json'
  let linkElement = document.createElement('a')
  linkElement.setAttribute('href',dataUri)
  linkElement.setAttribute('download',exportFileName)
  linkElement.click()

}