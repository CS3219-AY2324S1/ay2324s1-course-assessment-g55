'use client'

const UserCard = (props) => {
  return (
    <div className="flex justify-between rounded-lg shadow-lg overflow-hidden bg-blue-100 my-8">
      <div className="px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900">
          {props.user.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{props.user.email}</p>
      </div>
    </div>
  )
}

export default UserCard
