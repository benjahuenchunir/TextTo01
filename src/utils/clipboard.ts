export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('Text copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy: ', error)
  }
}
