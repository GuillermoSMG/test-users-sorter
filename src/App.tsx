import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList'
import { SortBy, type User } from './types.d'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const originalUsers = useRef<User[]>([])

  const [showColors, setShowColors] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const filterUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NAME) return filterUsers.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
    if (sorting === SortBy.LAST) return filterUsers.toSorted((a, b) => a.name.last.localeCompare(b.name.last))
    if (sorting === SortBy.COUNTRY) return filterUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    return filterUsers
  }, [filterUsers, sorting])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async response => await response.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => { console.log(err) })
  }, [])

  return (
    <div>
        <h1>Users list</h1>
        <header style={{ gap: '10px', display: 'inline-flex' }}>
          <button onClick={toggleColors}>Color rows</button>
          <button onClick={toggleSortByCountry}>{sorting === SortBy.COUNTRY ? 'Not sort by country' : 'Sort by Country'}</button>
          <button onClick={handleReset}>Reset list</button>
          <input type="text" placeholder='Filter by country' onChange={e => {
            setFilterCountry(e.target.value)
          }} />
        </header>
        <UsersList users={sortedUsers} showColors={showColors} handleDelete={handleDelete} changeSorting={handleChangeSort} />
    </div>
  )
}

export default App
