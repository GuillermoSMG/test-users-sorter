import { SortBy, type User } from '../types.d'
import '../App.css'
interface UsersListProps {
  users: User[]
  showColors: boolean
  handleDelete: (uuid: string) => void
  changeSorting: (sort: SortBy) => void
}

const UsersList = ({ users, showColors, handleDelete, changeSorting }: UsersListProps) => {
  return (
    <table className='table'>
        <thead>
          <tr>
            <th>Picture</th>
            <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>Name</th>
            <th className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>Surname</th>
            <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            const bgColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColors ? bgColor : 'transparent'
            return (
                <tr key={user.login.uuid} style={{ backgroundColor: color }}>
                  <td><img src={user.picture.thumbnail} alt="User Avatar" /></td>
                  <td>{user.name.first}</td>
                  <td>{user.name.last}</td>
                  <td>{user.location.country}</td>
                  <td><button onClick={() => { handleDelete(user.login.uuid) }}>Delete</button></td>
                </tr>
            )
          })}
        </tbody>
    </table>
  )
}
export default UsersList
