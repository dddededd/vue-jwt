const helper = {
  getCurrentDate() {
    return new Date().toISOString().slice(0, 10).replaceAll('-', '/')
  },
}

export default helper
