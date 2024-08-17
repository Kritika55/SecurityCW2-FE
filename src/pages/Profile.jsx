import React, { useContext, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/user-context';
import axios from 'axios';

const ProfilePage = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(user.profileImage);
    const [loading, setLoading] = useState(false);

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true);
            const formData = new FormData();
            formData.append('profileImage', file);

            try {
                const response = await axios.put('/api/profile', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setProfileImage(response.data.profileImage);
                setUser(prev => ({ ...prev, profileImage: response.data.profileImage }));
            } catch (error) {
                console.error('Error updating profile image:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        try {
            await axios.put('/api/profile', {
                username: user.username,
                email: user.email,
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="max-w-md m-10 mx-auto p-8 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-center mb-6">
                <div className="relative border rounded-full border-gray-200">
                    <img
                        src={profileImage || '/default-profile.png'}
                        alt="Profile"
                        className="rounded-full h-24 w-24 object-cover"
                    />
                    <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-white text-white rounded-full p-2 cursor-pointer border rounded-full">
                        <MdEdit className="text-black" />
                        <input
                            type="file"
                            id="profilePicture"
                            className="hidden"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            </div>

            {/* User Details Form */}
            <form onSubmit={handleUpdateProfile}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <p>{user.username}</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <p>{user.email}</p>
                </div>
                <Link to="/updatepassword" className="text-sm underline text-gray-600 hover:text-yellow-500">Update Password</Link>
                <button
                    type="submit"
                    className="w-full mt-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;



// import React, { useContext, useRef, useState } from 'react';
// import {MdEdit} from "react-icons/md";
// import {Link, useNavigate} from "react-router-dom";
// import { UserContext } from '../utils/user-context';

// const ProfilePage = () => {
//     const { user } = useContext(UserContext);
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const [profileImage, setProfileImage] = useState(user.profileImage);

//   const handleEditClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//     return (
//         <div className="max-w-md m-10 mx-auto p-8 bg-white shadow-lg rounded-lg">
//             <div className="flex items-center justify-center mb-6">
//                 <div className="relative border rounded-full border-gray-200">
//                     <img
//                         src=""
//                         alt="Profile"
//                         className="rounded-full h-24 w-24 object-cover"
//                     />
//                     <label htmlFor="profilePicture"
//                            className="absolute bottom-0 right-0 bg-white text-white rounded-full p-2 cursor-pointer border rounded-full">
//                         <MdEdit className="text-black"/>
//                         <input
//                             type="file"
//                             id="profilePicture"
//                             className="hidden"
//                             accept="image/*"
//                             // Handle file change logic here
//                         />
//                     </label>
//                 </div>
//             </div>

//             {/* User Details Form */}
//             <form>
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                         Username
//                     </label>
//                     <p>{user.username}</p>
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                         Email address
//                     </label>
//                     <p>{user.email}</p>
//                 </div>
//                 <Link to="/updatepassword" className="text-sm underline text-gray-600 hover:text-yellow-500">Reset Password</Link>
//                 <button
//                     type="submit"
//                     className="w-full mt-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
//                 >
//                     Update Profile
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ProfilePage;
