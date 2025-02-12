import { useState } from "react"
import avatar from "../../assets/User_Avatar_2.png"
import usersService from "../../services/usersService"
import { useAuth } from "../../hooks/useAuth"

const SuggestionItem = ({user, openInvitationModal}) => {

  return <>
    <div className="w-64 p-3 bg-white shadow-sm mx-2 hover:shadow-md">
      <div className="w-full h-16 bg-gray-200 flex justify-center items-end relative">
        <div className="w-20 h-20 rounded-full border-4 border-white absolute top-1/2">
          <img src={user.imageUrl ? apiImageUrl(user.imageUrl) : avatar} alt={user.name} />
        </div>
      </div>
      <div className="mt-10 text-center">
        <div className="font-bold">
          {user.name}
        </div>
        <div className="text-sm text-gray-500">
          {user.email}
        </div>
        <button 
          onClick={() => openInvitationModal(user)}
          className="w-full px-3 py-1 mt-2 bg-gray-50 rounded-md text-gray-900 border-2 border-gray-900"
        >
          Invite as friends
        </button>
      </div>
    </div>
  </>
}

export default SuggestionItem