const token = localStorage.getItem( "token" )
const getConfig = () => ({
  headers: { Authorization: `Bearer ${token}` }
})
export default getConfig